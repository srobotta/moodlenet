import { shell } from './shell.mjs'
import type { LanguageConfig } from './types.mjs'
export const env = await getEnv()

// shell.log('debug', inspect({ pr: env.keyLikes.private, pu: env.keyLikes.public }, true, 10, true))

async function getEnv(): Promise<LanguageConfig> {
  //FIXME: validate configs
  const env: LanguageConfig = {
    languages: shell.config.languages,
  }

  return env
}
