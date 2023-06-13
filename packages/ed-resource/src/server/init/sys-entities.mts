import type { EntityCollectionDef } from '@moodlenet/system-entities/server'
import { registerEntities } from '@moodlenet/system-entities/server'
import type { EdResourceEntityNames } from '../../common/types.mjs'
import { shell } from '../shell.mjs'
import type { ResourceDataType } from '../types.mjs'
export const TEXT_SEARCH_INDEX_NAME = 'text_search'

export const { Resource } = await shell.call(registerEntities)<
  {
    Resource: EntityCollectionDef<ResourceDataType>
  },
  EdResourceEntityNames
>({
  Resource: {},
})
