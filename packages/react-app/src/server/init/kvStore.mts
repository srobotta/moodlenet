import kvStoreFactory from '@moodlenet/key-value-store/server'
import type { LanguageConfig } from '../../common/i18n/types.mjs'
import type { AppearanceData } from '../../common/types.mjs'
import { shell } from '../shell.mjs'

export type WebappBuildInfo =
  | {
      status: 'built'
      lastBuild: string
      pluginsHash: string
    }
  | {
      status: 'building'
      pluginsHash: string
    }

export type KeyValueData = {
  'persistence-version': { v: number }
  'appearanceData': AppearanceData
  'language': LanguageConfig
  'configs': {
    webImageSize: [number, number]
    webIconSize: [number, number]
  }
  'build-info': WebappBuildInfo
}
export const kvStore = await kvStoreFactory<KeyValueData>(shell)
