import type { LanguageConfig } from './types.mjs'
//import { languages as configLang } from "../exports.mjs"
//const configLang = { default: 'en', available: ['de', 'en', 'fr'] }
//import { shell } from './shell.mjs'
//import { env } from './init.mjs'
//import { coreConfigs } from "../main/env.mjs"

export const getLanguageConfig = () => {
  //export function getLanguageConfig(): LanguageConfig {
  //const { config }: { config: LanguageConfig | any } = env
  const config = { languages: { default: 'en', available: ['de', 'fr', 'en'] } }
  return {
    languages: config.languages ? config.languages : { default: 'en', available: ['en'] },
  } as LanguageConfig
}
