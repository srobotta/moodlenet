import type { Translations } from './types.mjs'
//import { coreConfigs } from '../main/env.mjs'
import { getLanguageConfig } from './config.mjs'
const coreConfigs = getLanguageConfig()
//const coreConfigs = { languages: { default: 'en', available: ['de', 'en', 'fr'] } }

/**
 * The current language that is used at the moment.
 */
let currentLang: string

/**
 * A list of translations for the meta options.
 */
let listMap: Record<string, Translations> = {}

/**
 * The translations for the current language.
 */
let trans: Translations = {}

/**
 * Load the language strings from the locale files.
 * @param lang
 */
async function loadTranslations(lang: string): Promise<void> {
  const m = await import(`./locales/${lang}/ed-meta-options.mjs`)
  listMap = m.edMetaOptions
  const t = await import(`./locales/${lang}/translation.mjs`)
  trans = t.translations
}

/**
 * Initialize the language handling. Determine the current language and load the translations.
 */
const init = async function () {
  await loadTranslations(getCurrentLang())
}

/**
 * Translates a single string, identified by a key. If the translation string contains
 * placeholders like "{1}" these are replaced by the optional args array.
 *
 * @param key
 * @param args
 * @returns string
 */
export const t = function (key: string, args?: unknown[]): string {
  if (key in trans) {
    let val = eval(`trans.${key}`)
    if (args) {
      args.forEach((arg, i) => {
        val = val.replace(`{${i + 1}}`, arg)
      })
    }
    return val
  }
  return key
}

/**
 * Trannslates a list of options. The list is identified by a key and the options are in an array, each
 * element consiting of a value and a label. The label is translated.
 *
 * @param list
 * @param options
 * @returns options
 */
export const tl = function (
  list: keyof typeof listMap,
  options: Array<{ value: string; label: string }>,
): Array<{ value: string; label: string }> {
  if (!(list in listMap)) {
    return options
  }
  return options.map(option => {
    const l = eval(`listMap.${list}`)
    return { value: option.value, label: l[option.value] ?? option.label }
  })
}

/**
 * Return the label of a list value.
 * @param list
 * @param value
 * @returns
 */
export const tm = function (list: keyof typeof listMap, value: string): string {
  if (!(list in listMap)) {
    return value
  }
  const l = eval(`listMap.${list}`)
  return l[value] ?? value
}

/**
 * Same as t() except that it uses the singular or plural form of the string, depending on the count.
 * @param singular
 * @param plural
 * @param count
 * @returns string
 */
export const tn = function (singular: string, plural: string, count: number): string {
  return count === 1 ? t(singular, [count]) : t(plural, [count])
}

/**
 * Return the translated name of a resource type (e.g. Image). If there is no translation for the type,
 * the type itself is returned.
 * @param type
 * @returns string
 */
export const typeLabel = function (type: string): string {
  const key = `type_${type.toLowerCase()}`
  const val = t(key)
  if (val === key) {
    return type
  }
  return val
}

/**
 * List of supported language codes.
 * @returns array of language iso codes
 */
export const getLanguagesIso = function (): string[] {
  return coreConfigs.languages?.available || ['en']
}

/**
 * Get current language, either from the local store or from the browser settings.
 * @returns string
 */
export const getCurrentLang = function (): string {
  const lang =
    localStorage.getItem('mnet-i18n-lang') ?? navigator.language.toString().split('-')[0] ?? ''
  if (getLanguagesIso().includes(lang)) {
    currentLang = lang
  } else {
    currentLang = coreConfigs.languages?.default || 'en'
  }
  return currentLang
}

/**
 * Set the current language. Store it in the local store of the browser.
 * @param lang
 */
export const setLang = function (lang: string): void {
  currentLang = lang
  localStorage.setItem('mnet-i18n-lang', lang)
}

// Run the init function to asynchronuously load the specific language files with the translations.
await init()
