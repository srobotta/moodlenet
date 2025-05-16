import type { PkgExposeDef } from '@moodlenet/core'
import type { LanguageConfig, UserData } from './exports.mjs'

export type ReactAppExposeType = PkgExposeDef<{
  rpc: {
    'webapp/get-language'(): Promise<LanguageConfig>
    'webapp/get-userconfig'(): Promise<UserData>
  }
}>
