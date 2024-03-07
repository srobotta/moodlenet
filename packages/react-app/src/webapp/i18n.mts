import { translations as tr_de } from '../locales/de/translation.mjs'
import { translations as tr_en } from '../locales/en/translation.mjs'
import type { Translations } from './types/i18n.mjs'

let currentLang: string

class i18nHandler {
  constructor(lang: string) {
    currentLang = lang
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
  }
}

export const i18n = new i18nHandler('de')
export const t = i18n.t
