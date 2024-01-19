import type { ResourceDataType } from '@moodlenet/ed-resource/server'
import type { EntityIdentifier } from '@moodlenet/system-entities/common'
import type { EntityDocument, EntityFullDocument } from '@moodlenet/system-entities/server'

export type CollectionEntityDoc = EntityDocument<CollectionDataType>
export type CollectionMeta = {
  title: string
  description: string
  image: null | Image
}
export type ResourceListItem = {
  _key: string
}

export type CollectionDataType = CollectionMeta & {
  published: boolean
  resourceList: ResourceListItem[]
  popularity?: {
    overall: number
    items: { [key: string]: CollectionPopularityItem }
  }
}
export type CollectionPopularityItem = { value: number }

export type Credits = {
  owner: { url: string; name: string }
  provider?: { name: string; url: string }
}
export type Image = ImageUploaded | ImageUrl
export type ImageUploaded = { kind: 'file'; directAccessId: string; credits?: Credits | null }
export type ImageUrl = { kind: 'url'; url: string; credits?: Credits | null }

export type CollectionEvents = CollectionActivityEvents
export type CollectionActivityEvents = {
  'created': {
    collection: EntityFullDocument<CollectionDataType>
    userId: EntityIdentifier
  }
  'updated-meta': {
    collectionKey: string
    userId: EntityIdentifier
    oldMeta: CollectionMeta
    meta: CollectionMeta
  }
  'published': {
    userId: EntityIdentifier
    collection: EntityFullDocument<CollectionDataType>
  }
  'resource-list-curation': {
    collectionKey: string
    action: 'add' | 'remove'
    resource: EntityFullDocument<ResourceDataType>
    userId: EntityIdentifier
    resourceList: ResourceListItem[]
  }
  'unpublished': {
    userId: EntityIdentifier
    collection: EntityFullDocument<CollectionDataType>
  }
  'deleted': {
    userId: EntityIdentifier
    collection: EntityFullDocument<CollectionDataType>
  }
}
