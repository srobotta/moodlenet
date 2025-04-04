import type { LanguageConfig as langSetting } from './types.mjs'

class LanguageConfig {
  private static instance: LanguageConfig
  private config: langSetting | undefined
  private constructor() {
    this.config = { languages: { default: 'de', available: ['de', 'fr', 'en'] } }
  }

  public static getInstance(): LanguageConfig {
    if (!LanguageConfig.instance) {
      console.log('Creating new instance of LanguageConfig')
      LanguageConfig.instance = new LanguageConfig()
    }
    return LanguageConfig.instance
  }

  public getDefault(): string {
    return this.config?.languages.default || 'de'
  }

  public getAvailable(): string[] {
    return this.config?.languages.available || ['de', 'fr', 'en']
  }

  public setConfig(config: langSetting) {
    console.log('Setting language config', config)
    this.config = config
  }
}
export default LanguageConfig
