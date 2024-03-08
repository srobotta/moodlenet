import { translations as tr_de } from '../locales/de/translation.mjs'
import { translations as tr_en } from '../locales/en/translation.mjs'
import type { Translations } from './types/i18n.mjs'

let currentLang: string

class i18nHandler {
  constructor() {
    const lang =
      localStorage.getItem('mnet-i18n-lang') ?? navigator.language.toString().split('-')[0]
    if (lang === 'de' || lang === 'en') {
      currentLang = lang
    } else {
      currentLang = 'de'
    }
  }

  t(key: string): string {
    let trans: Translations
    if (currentLang === 'de') {
      trans = tr_de
    } else {
      trans = tr_en
    }

    if (key in trans) {
      const val = eval(`trans.${key}`)
      return val
    }
    return key
  }
  getLanguagesIso(): string[] {
    return ['de', 'en']
  }
  setLang(lang: string): void {
    currentLang = lang
    localStorage.setItem('mnet-i18n-lang', lang)
  }
}

export const i18n = new i18nHandler()
export const t = i18n.t
