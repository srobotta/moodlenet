export type Translations = {
  [key: string]: string
}
export type translateFunc = (key: string) => string
export type LanguageConfig = {
  languages: {
    default: string
    available: Array<string>
  }
}
