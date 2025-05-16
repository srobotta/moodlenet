import type { PkgExposeDef } from '@moodlenet/core'
import type { LanguageConfig } from './exports.mjs'

export type ReactAppExposeType = PkgExposeDef<{
  rpc: {
    'webapp/get-language'(): Promise<LanguageConfig>
  }
}>
