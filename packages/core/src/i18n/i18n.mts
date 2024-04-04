import { edMetaOptions as options_de } from './locales/de/ed-meta-options.mjs'
import { translations as tr_de } from './locales/de/translation.mjs'
import { edMetaOptions as options_en } from './locales/en/ed-meta-options.mjs'
import { translations as tr_en } from './locales/en/translation.mjs'
import { edMetaOptions as options_fr } from './locales/fr/ed-meta-options.mjs'
import { translations as tr_fr } from './locales/fr/translation.mjs'

import type { Translations } from './types.mjs'

let currentLang: string
let listMap: Record<string, Translations> = {}

class i18nHandler {
  constructor() {
    const lang =
      localStorage.getItem('mnet-i18n-lang') ?? navigator.language.toString().split('-')[0]
    if (lang === 'de' || lang === 'en' || lang === 'fr') {
      currentLang = lang
    } else {
      currentLang = 'de'
    }
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
    let trans: Translations
    if (currentLang === 'de') {
      trans = tr_de
      listMap = options_de
    } else if (currentLang === 'fr') {
      trans = tr_fr
      listMap = options_fr
    } else {
      trans = tr_en
      listMap = options_en
    }

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
  /*
  async tl(list: keyof typeof listMap, options: Array<{ value: string; label: string }>): Promise<{ value: string; label: string }[]> {
    if (!(list in listMap)) {
      const module = await import(`./locales/${currentLang}/${list}.mjs`)
      listMap[list] = module.default
    }
    return options.map((option) => {
      const l = eval(`listMap.${list}`)
      return { value: option.value, label: l[option.value] ?? option.label }
    })
  }*/

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
    return ['de', 'en', 'fr']
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
