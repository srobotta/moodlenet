import type { Patch } from '@moodlenet/arangodb/server'
import { isArangoError } from '@moodlenet/arangodb/server'
import { delCollection } from '@moodlenet/collection/server'
import { nameMatcher } from '@moodlenet/core-domain/resource'
import type { JwtToken } from '@moodlenet/crypto/server'
import { jwt } from '@moodlenet/crypto/server'
import { stdEdResourceMachine } from '@moodlenet/ed-resource/server'
import { getCurrentHttpCtx, getMyRpcBaseUrl } from '@moodlenet/http-server/server'
import { getOrgData } from '@moodlenet/organization/server'
import { webSlug } from '@moodlenet/react-app/common'
import {
  create,
  getPkgCurrentUser,
  matchRootPassword,
  setCurrentSystemUser,
  setPkgCurrentUser,
} from '@moodlenet/system-entities/server'
import assert from 'assert'
import dot from 'dot'
import type { CookieOptions } from 'express'
import { waitFor } from 'xstate/lib/waitFor.js'
import {
  WEB_USER_SESSION_TOKEN_AUTHENTICATED_BY_COOKIE_NAME,
  WEB_USER_SESSION_TOKEN_COOKIE_NAME,
} from '../../common/exports.mjs'
import { Profile } from '../exports.mjs'
import { db, WebUserCollection } from '../init/arangodb.mjs'
import { kvStore } from '../init/kvStore.mjs'
import { shell } from '../shell.mjs'
import type {
  CreateRequest,
  ProfileDataType,
  TokenCtx,
  TokenVersion,
  UnverifiedTokenCtx,
  VerifiedTokenCtx,
  WebUserAccountDeletionToken,
  WebUserDataType,
  WebUserEvents,
  WebUserJwtPayload,
  WebUserRecord,
} from '../types.mjs'
import { reduceToKnownFeaturedEntities } from './known-entity-types.mjs'
import { entityFeatureAction, getProfileOwnKnownEntities, getProfileRecord } from './profile.mjs'

const VALID_JWT_VERSION: TokenVersion = 1
export async function signWebUserJwt(webUserJwtPayload: WebUserJwtPayload): Promise<JwtToken> {
  const sessionToken = await shell.call(jwt.sign)(webUserJwtPayload, {
    expirationTime: '1w',
    subject: webUserJwtPayload.isRoot ? undefined : webUserJwtPayload.webUser._key,
    scope: [/* 'full-user',  */ 'openid'],
  })
  return sessionToken
}

export async function getCurrentProfileIds() {
  const tokenCtx = await verifyCurrentTokenCtx()
  if (!tokenCtx || tokenCtx.payload.isRoot) {
    return
  }

  return tokenCtx.payload.profile
}

export async function getCurrentWebUserIds() {
  const tokenCtx = await verifyCurrentTokenCtx()
  if (!tokenCtx || tokenCtx.payload.isRoot) {
    return
  }
  return tokenCtx.payload.webUser
}

//BEWARE ! this token is valued by webapp only!! e.g. won't be by oauth !!
export async function verifyCurrentTokenCtx() {
  const currentCtx = shell.myAsyncCtx.get()
  if (!currentCtx?.tokenCtx) {
    return
  }
  if (currentCtx.tokenCtx.type === 'verified-token') {
    return currentCtx.tokenCtx
  }
  const { currentJwtToken } = currentCtx.tokenCtx
  const jwtVerifyResult = await shell.call(jwt.verify)<WebUserJwtPayload>(
    currentJwtToken,
    isWebUserJwtPayload,
  )
  if (!jwtVerifyResult) {
    shell.myAsyncCtx.unset()
    return
  }
  const { payload } = jwtVerifyResult
  const verifiedTokenCtx: VerifiedTokenCtx = {
    type: 'verified-token',
    currentJwtToken,
    payload,
  }

  return verifiedTokenCtx
}

export async function loginAsRoot(rootPassword: string): Promise<boolean> {
  const rootPasswordMatch = await matchRootPassword(rootPassword)
  if (!rootPasswordMatch) {
    return false
  }
  const jwtToken = await signWebUserJwt({ isRoot: true, v: VALID_JWT_VERSION })
  shell.call(sendWebUserTokenCookie)(jwtToken)
  return true
}

async function setCurrentTokenCtx(tokenCtx: TokenCtx) {
  shell.myAsyncCtx.set(current => ({ ...current, tokenCtx }))
}

export async function setCurrentUnverifiedJwtToken(currentJwtToken: JwtToken) {
  const unverifiedTokenCtx: UnverifiedTokenCtx = {
    type: 'unverified-token',
    currentJwtToken,
  }
  await setCurrentTokenCtx(unverifiedTokenCtx)
}

// export async function setCurrentVerifiedJwtToken(currentJwtToken: JwtToken, sendCookie: boolean) {
//   const currentWebUser = await verifyWebUserToken(currentJwtToken)
//   assert(currentWebUser)
//   const verifiedTokenCtx: VerifiedTokenCtx = {
//     type: 'verified-token',
//     currentJwtToken,
//     currentWebUser,
//   }
//   await setCurrentTokenCtx(verifiedTokenCtx, sendCookie)
// }

// export async function verifyWebUserToken(token: JwtToken) {
//   const jwtVerifyResult = await shell.call(jwt.verify)<WebUserJwtPayload>(token)
//   shell.log('debug', { jwtVerifyResult })
//   if (!(jwtVerifyResult && jwtVerifyResult.payload.v === VALID_JWT_VERSION)) {
//     return
//   }

//   return jwtVerifyResult.payload
// }

////

export function sendWebUserTokenCookie(jwtToken: JwtToken | undefined) {
  const { pkgId } = shell.assertCallInitiator()
  const httpCtx = getCurrentHttpCtx()
  const httpResponse = httpCtx?.response
  // shell.log('debug', { httpResponse, jwtToken, jwtTokenL: jwtToken?.length })
  if (!httpResponse) {
    return
  }

  if (!jwtToken) {
    const clearCookieOptions: CookieOptions = {
      /** FIXME: set proper options !!! */
    }
    httpResponse.clearCookie(WEB_USER_SESSION_TOKEN_COOKIE_NAME, clearCookieOptions)
    return
  }
  const setCookieOptions: CookieOptions = {
    /** FIXME: set proper options !!! */
  }
  httpResponse.cookie(WEB_USER_SESSION_TOKEN_COOKIE_NAME, jwtToken, setCookieOptions)
  httpResponse.cookie(
    WEB_USER_SESSION_TOKEN_AUTHENTICATED_BY_COOKIE_NAME,
    pkgId.name,
    setCookieOptions,
  )
  return
}

export async function getWebUserByProfileKey({
  profileKey,
}: {
  profileKey: string
}): Promise<WebUserRecord | undefined> {
  const foundUsersCursor = await db.query<WebUserRecord>(
    `
      FOR user in @@WebUserCollection
        FILTER user.profileKey == @profileKey
        LIMIT 1
      RETURN user
    `,
    { profileKey, '@WebUserCollection': WebUserCollection.name },
  )
  const foundUser = await foundUsersCursor.next()
  return foundUser
}
export async function createWebUser(createRequest: CreateRequest) {
  const { contacts, isAdmin, ...profileData } = createRequest
  const createData: ProfileDataType = {
    publisher: false,
    aboutMe: '',
    avatarImage: undefined,
    backgroundImage: undefined,
    location: '',
    organizationName: '',
    siteUrl: '',
    knownFeaturedEntities: [],
    points: 0,
    webslug: webSlug(profileData.displayName),
    settings: {},
    ...profileData,
  }
  const newProfile = await create(Profile.entityClass, createData, { pkgCreator: true })

  if (!newProfile) {
    return
  }

  const webUserData: WebUserDataType = {
    profileKey: newProfile._key,
    displayName: newProfile.displayName,
    isAdmin,
    contacts,
  }

  const { new: newWebUser } = await WebUserCollection.save(webUserData, { returnNew: true })

  if (!newWebUser) {
    return
  }

  shell.events.emit('created-web-user-account', {
    profileKey: newProfile._key,
    webUserKey: newWebUser._key,
  })
  if (newProfile.publisher) {
    shell.events.emit('user-publishing-permission-change', {
      type: 'given',
      profile: newProfile,
      moderator: await getPkgCurrentUser(),
    })
  }
  const jwtToken = await signWebUserJwt({
    v: VALID_JWT_VERSION,
    webUser: {
      _key: newWebUser._key,
      displayName: newWebUser.displayName,
      isAdmin: newWebUser.isAdmin,
    },
    profile: {
      _id: newProfile._id,
      _key: newProfile._key,
      publisher: newProfile.publisher,
    },
  })

  return {
    newWebUser,
    newProfile,
    jwtToken,
  }
}
export async function signWebUserJwtToken({ webUserkey }: { webUserkey: string }) {
  const webUser = await getWebUser({ _key: webUserkey })
  if (!webUser) {
    return
  }
  const profile = await Profile.collection.document(
    { _key: webUser.profileKey },
    { graceful: true },
  )

  if (!profile) {
    return
  }
  const jwtToken = await signWebUserJwt({
    v: VALID_JWT_VERSION,
    webUser: {
      _key: webUser._key,
      displayName: webUser.displayName,
      isAdmin: webUser.isAdmin,
    },
    profile: {
      _id: profile._id,
      _key: profile._key,
      publisher: profile.publisher,
    },
  })
  shell.events.emit('web-user-logged-in', {
    profileKey: profile._key,
    webUserKey: webUser._key,
  })
  return jwtToken
}
export async function getWebUser({
  _key,
}: {
  _key: string
}): Promise<WebUserRecord | undefined | null> {
  const foundUser = await WebUserCollection.document({ _key }, { graceful: true })
  return foundUser
}

export async function patchWebUserDisplayName({
  _key,
  displayName,
}: {
  _key: string
  displayName: string
}) {
  const { new: patchedUser } = await WebUserCollection.update(
    { _key },
    { displayName },
    { returnNew: true },
  )

  return patchedUser
}

export async function patchWebUser(
  { _key }: { _key: string },
  patch: Patch<Omit<WebUserDataType, 'displayName'>>, // | string,
) {
  return WebUserCollection.update({ _key }, patch, { returnNew: true, returnOld: true }).catch(
    err => {
      if (isArangoError(err) && err.errorNum === 1202) {
        return {
          new: undefined,
          old: undefined,
        }
      }
      throw err
    },
  )
}

export async function setWebUserIsAdmin(
  req: { isAdmin: boolean } & ({ profileKey: string } | { userKey: string }),
) {
  const byUserKey = 'userKey' in req
  const key = byUserKey ? req.userKey : req.profileKey
  const isAdmin = req.isAdmin

  const patchedCursor = await db.query(
    `
      FOR user in @@WebUserCollection
        FILTER user.${byUserKey ? '_key' : 'profileKey'} == @key
        LIMIT 1
        UPDATE user
        WITH { isAdmin: @isAdmin }
        INTO @@WebUserCollection
      RETURN NEW
    `,
    { key, '@WebUserCollection': WebUserCollection.name, isAdmin },
    {
      retryOnConflict: 5,
    },
  )

  const [patchedUser] = await patchedCursor.all()
  return patchedUser
}

export async function searchUsers(search: string): Promise<WebUserRecord[]> {
  const cursor = await db.query(
    `
    FOR webUser in @@WebUserCollection
    let matchScore = LENGTH(@search) < 1 ? 1 
                      : NGRAM_POSITIONAL_SIMILARITY(webUser.name, @search, 2)
                      + NGRAM_POSITIONAL_SIMILARITY(webUser.contacts.email, @search, 2)
    SORT matchScore DESC
    FILTER matchScore > 0.05
    LIMIT 10
    RETURN webUser`,
    { search, '@WebUserCollection': WebUserCollection.name },
  )

  const webUsers = await cursor.all()

  return webUsers
}

export async function currentWebUserDeletionAccountRequest() {
  //Confirm account deletion 🥀

  const currWebUser = await getCurrentWebUserIds()
  if (!currWebUser) {
    return
  }
  const msgTemplates = (await kvStore.get('message-templates', '')).value
  assert(msgTemplates, 'missing message-templates:: record in KeyValueStore')
  const token = await signWebUserAccountDeletionToken(currWebUser._key)
  const orgData = await getOrgData()

  const msgVars: DelAccountMsgVars = {
    actionButtonUrl: `${await shell.call(
      getMyRpcBaseUrl,
    )()}webapp/web-user/delete-account-request/confirm/${token}`,
    instanceName: orgData.data.instanceName,
  }
  const html = dot.compile(msgTemplates.deleteAccountConfirmation)(msgVars)

  shell.events.emit('request-send-message-to-web-user', {
    message: { html, text: html },
    subject: 'Confirm account deletion 🥀',
    title: 'Confirm account deletion 🥀',
    toWebUser: {
      _key: currWebUser._key,
      displayName: currWebUser.displayName,
    },
  })

  return

  type DelAccountMsgVars = {
    instanceName: string
    actionButtonUrl: string
  }
}

export async function deleteWebUserAccountConfirmedByToken(token: string) {
  const webUserAccountDeletionToken = await jwt.verify<WebUserAccountDeletionToken>(
    token,
    isWebUserAccountDeletionToken,
  )
  if (!webUserAccountDeletionToken) {
    return
  }

  return _deleteWebUserAccountNow(webUserAccountDeletionToken.payload.webUserKey)
}

async function _deleteWebUserAccountNow(webUserKey: string) {
  return await shell.initiateCall(async () => {
    await setPkgCurrentUser()
    const { old: webUser } = await patchWebUser({ _key: webUserKey }, { deleting: true })
    if (!webUser) {
      return { status: 'not-found' } as const
    }
    if (webUser.deleting) {
      return { status: 'deleting' } as const
    }
    const profileRecord = await getProfileRecord(webUser.profileKey)
    assert(profileRecord, '_deleteWebUserAccountNow: profile#${webUser.profileKey} not found')
    const profile = profileRecord.entity
    if (profile.publisher) {
      const knownFeaturedEntities = reduceToKnownFeaturedEntities(profile.knownFeaturedEntities)
      const allDiscardingFeatures = [
        ...knownFeaturedEntities.follow.collection.map(
          ({ _key }) => ({ entityType: 'collection', feature: 'follow', _key } as const),
        ),
        ...knownFeaturedEntities.follow.profile.map(
          ({ _key }) => ({ entityType: 'profile', feature: 'follow', _key } as const),
        ),
        ...knownFeaturedEntities.follow.subject.map(
          ({ _key }) => ({ entityType: 'subject', feature: 'follow', _key } as const),
        ),
        ...knownFeaturedEntities.like.resource.map(
          ({ _key }) => ({ entityType: 'resource', feature: 'like', _key } as const),
        ),
      ]
      await shell.initiateCall(async () => {
        await setCurrentSystemUser({
          type: 'entity',
          entityIdentifier: { _key: profile._key, entityClass: profileRecord.meta.entityClass },
          restrictToScopes: false,
        })
        await Promise.all(
          allDiscardingFeatures.map(
            ({ _key, entityType, feature }) =>
              entityFeatureAction({
                _key,
                entityType,
                feature,
                action: 'remove',
                profileKey: profile._key,
              }),
            // shell.log('debug', `remove entityFeatureAction ${entityType} ${feature} ${_key}`),
          ),
        )
      })
    }
    const ownCollections = await getProfileOwnKnownEntities({
      knownEntity: 'collection',
      profileKey: profile._key,
    })

    const ownResources = await getProfileOwnKnownEntities({
      knownEntity: 'resource',
      profileKey: profile._key,
    })

    const leftCollectionsRecords = ownCollections.filter(({ entity: { published } }) => published)
    const leftResourcesRecords = ownResources.filter(({ entity: { published } }) => published)
    const deletedCollectionsRecords = ownCollections.filter(
      ({ entity: { published } }) => !published,
    )
    const deletedResourcesRecords = ownResources.filter(({ entity: { published } }) => !published)

    await shell.initiateCall(async () => {
      await setCurrentSystemUser({
        type: 'entity',
        entityIdentifier: { _key: profile._key, entityClass: profileRecord.meta.entityClass },
        restrictToScopes: false,
      })
      await Promise.all(
        deletedCollectionsRecords.map(async ({ entity: { _key } }) => {
          await delCollection(_key)
          // shell.log('debug', { delCollection: _key })
          return { _key }
        }),
      )
      await Promise.all(
        deletedResourcesRecords.map(async data => {
          const [interpreter /* , initializeContext, machine, configs */] =
            await stdEdResourceMachine({
              by: 'data',
              data,
            })
          if (interpreter.getSnapshot().can('trash')) {
            interpreter.send('trash')
            await waitFor(interpreter, nameMatcher('Destroyed'))
          }
          interpreter.stop()
          // shell.log('debug', { delResource: _key })
          return { _key: data.entity._key }
        }),
      )
    })

    await Profile.collection.remove(profile._key)
    await WebUserCollection.remove(webUser._key)

    const event: WebUserEvents['deleted-web-user-account'] = {
      displayName: profile.displayName,
      profile: { ...profileRecord.entity, _meta: profileRecord.meta },
      webUser: webUser,
      deletedCollections: deletedCollectionsRecords.map(({ entity: { _key } }) => ({ _key })),
      deletedResources: deletedResourcesRecords.map(({ entity: { _key } }) => ({ _key })),
      leftCollections: leftCollectionsRecords.map(({ entity: { _key } }) => ({ _key })),
      leftResources: leftResourcesRecords.map(({ entity: { _key } }) => ({ _key })),
    }
    shell.events.emit('deleted-web-user-account', event)
    return { status: 'done', event } as const
  })
}

export async function signWebUserAccountDeletionToken(webUserKey: string) {
  const webUserAccountDeletionToken: WebUserAccountDeletionToken = {
    scope: 'web-user-account-deletion',
    webUserKey,
  }
  return jwt.sign(webUserAccountDeletionToken, { expirationTime: '1d' })
}

function isWebUserAccountDeletionToken(payload: any): payload is WebUserAccountDeletionToken {
  return payload?.scope === 'web-user-account-deletion'
}

function isWebUserJwtPayload(_: any): _ is WebUserJwtPayload {
  // TODO: better validation
  return _?.v === VALID_JWT_VERSION && [true, false, undefined].some(__ => _?.isRoot === __)
}
