import { translations as tr_de } from '../locales/de/translation.mjs'
import { translations as tr_en } from '../locales/en/translation.mjs'
import type { Translations } from './types/i18n.mjs'

const defaultLang = 'de'
/*
if (navigator.language.startsWith('de')) {

*/

export type trans = Translations
export type key = string

export const t = function (key: string): string | any {
  let trans
  if (defaultLang === 'de') {
    trans = tr_de
  } else {
    trans = tr_en
  }
  console.log(key, defaultLang, trans)

  if (key in trans) {
    const val = eval(`trans.${key}`)
    return val
  }
  return key
}
