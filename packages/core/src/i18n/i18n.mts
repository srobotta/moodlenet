import type { Translations } from './types.mjs'

let currentLang: string
let listMap: Record<string, Translations> = {}
let trans: Translations = {}

const getAvailableLanguages = (): string[] => {
  return ['de', 'fr', 'en']
}

class i18nHandler {
  constructor() {
    const lang =
      localStorage.getItem('mnet-i18n-lang') ?? navigator.language.toString().split('-')[0] ?? ''
    if (getAvailableLanguages().includes(lang)) {
      currentLang = lang
    } else {
      currentLang = 'de'
    }
    import(`./locales/${currentLang}/ed-meta-options.mjs`).then(module => {
      listMap = module.edMetaOptions
    })
    import(`./locales/${currentLang}/translation.mjs`).then(module => {
      trans = module.translations
    })
  }

  /**
   * Translates a single string, identified by a key. If the translation string contains
   * placeholders like "{1}" these are replaced by the optional args array.
   *
   * @param key
   * @param args
   * @returns string
   */
  t(key: string, args?: unknown[]): string {
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
  tl(
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
  tm(list: keyof typeof listMap, value: string): string {
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
  tn(singular: string, plural: string, count: number): string {
    return count === 1 ? t(singular, [count]) : t(plural, [count])
  }

  /**
   * Return the translated name of a resource type (e.g. Image). If there is no translation for the type,
   * the type itself is returned.
   * @param type
   * @returns string
   */
  typeLabel(type: string): string {
    const key = `type_${type.toLowerCase()}`
    const val = i18n.t(key)
    if (val === key) {
      return type
    }
    return val
  }

  /**
   * List of supported language codes.
   * @returns array of language iso codes
   */
  getLanguagesIso(): string[] {
    return getAvailableLanguages()
  }

  /**
   * Set the current language. Store it in the local store of the browser.
   * @param lang
   */
  setLang(lang: string): void {
    currentLang = lang
    localStorage.setItem('mnet-i18n-lang', lang)
  }
}

export const i18n = new i18nHandler()
export const t = i18n.t
export const tl = i18n.tl
export const tm = i18n.tm
export const tn = i18n.tn
export const typeLabel = i18n.typeLabel
