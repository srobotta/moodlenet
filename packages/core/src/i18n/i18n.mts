import { translations as tr_de } from './locales/de/translation.mjs'
import { translations as tr_en } from './locales/en/translation.mjs'
import { translations as tr_fr } from './locales/fr/translation.mjs'

import type { Translations } from './types.mjs'

let currentLang: string

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

  t(key: string, args?: any[]): string {
    let trans: Translations
    if (currentLang === 'de') {
      trans = tr_de
    } else if (currentLang === 'fr') {
      trans = tr_fr
    } else {
      trans = tr_en
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
  tn(singular: string, plural: string, count: number): string {
    return count === 1 ? t(singular, [count]) : t(plural, [count])
  }
  getLanguagesIso(): string[] {
    return ['de', 'en', 'fr']
  }
  setLang(lang: string): void {
    currentLang = lang
    localStorage.setItem('mnet-i18n-lang', lang)
  }
}

export const i18n = new i18nHandler()
export const t = i18n.t
export const tn = i18n.tn
