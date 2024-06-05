import { t } from '@moodlenet/core/i18n'
import type { Href } from '@moodlenet/react-app/common'
import { Link, withProxy } from '@moodlenet/react-app/ui'
import { Bookmarks, DisplaySettings, ExitToApp, Settings } from '@mui/icons-material'
import { ReactComponent as ArrowsIcon } from '../../../assets/icons/arrows.svg'
import defaultAvatar from '../../../assets/img/default-avatar.svg'

export type ProfileLinkAvatarMenuComponentProps = {
  profileHref: Href
  avatarUrl: string | undefined
}
export const ProfileLinkAvatarMenuComponent = withProxy<ProfileLinkAvatarMenuComponentProps>(
  ({ profileHref, avatarUrl = defaultAvatar }) => {
    return (
      <Link href={profileHref} className="avatar">
        <div
          style={{
            backgroundImage: 'url("' + avatarUrl + '")',
            backgroundSize: 'cover',
            borderRadius: '50%',
            height: '28px',
            width: '28px',
          }}
        />
        {t('profile')}
      </Link>
    )
  },
)

export type LogoutAvatarMenuComponentProps = { logout(): void }
export const LogoutAvatarMenuComponent = withProxy<LogoutAvatarMenuComponentProps>(({ logout }) => {
  return (
    <span onClick={logout}>
      <ExitToApp /> {t('logout')}
    </span>
  )
})

export type UserSettingsLinkAvatarMenuComponentProps = { settingsHref: Href }
export const UserSettingsLinkAvatarMenuComponent =
  withProxy<UserSettingsLinkAvatarMenuComponentProps>(({ settingsHref }) => {
    return (
      <Link href={settingsHref}>
        <Settings />
        {t('settings')}
      </Link>
    )
  })

export type AdminSettingsLinkAvatarMenuComponentProps = { settingsHref: Href }
export const AdminSettingsLinkAvatarMenuComponent =
  withProxy<AdminSettingsLinkAvatarMenuComponentProps>(({ settingsHref }) => {
    return (
      <Link href={settingsHref}>
        <DisplaySettings />
        {t('admin')}
      </Link>
    )
  })

export type BookmarksLinkAvatarMenuComponentProps = { bookmarksHref: Href }
export const BookmarksLinkAvatarMenuComponent = withProxy<BookmarksLinkAvatarMenuComponentProps>(
  ({ bookmarksHref }) => {
    return (
      <Link href={bookmarksHref}>
        <Bookmarks />
        {t('bookmarks')}
      </Link>
    )
  },
)

export type FollowingLinkAvatarMenuComponentProps = { followingHref: Href }
export const FollowingLinkAvatarMenuComponent = withProxy<FollowingLinkAvatarMenuComponentProps>(
  ({ followingHref }) => {
    return (
      <Link href={followingHref}>
        <ArrowsIcon />
        {t('following')}
      </Link>
    )
  },
)
