import type { LanguageConfig } from './types.mjs'
//import { languages as configLang } from "../exports.mjs"
const configLang = { default: 'en', available: ['de', 'en', 'fr'] }
//import { shell } from './shell.mjs'

export const getLanguageConfig = () => {
  //export function getLanguageConfig(): LanguageConfig {
  //const { config }: { config: LanguageConfig | any } = shell
  const config = { languages: { default: 'en', available: ['en'] } }
  /*
  return {
    languages: config.languages
      ? config.languages
      : { default: 'en', available: ['en'] }
  } as LanguageConfig
  */
  return configLang ? { languages: configLang } : (config as LanguageConfig)
}
