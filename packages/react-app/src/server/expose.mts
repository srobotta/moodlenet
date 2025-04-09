import type { PkgExposeImpl } from '@moodlenet/core'
import type { ReactAppExposeType } from '../common/expose-def.mjs'
import { defaultLanguageConfig } from '../common/i18n/i18n.mjs'
import { kvStore } from '../server/init/kvStore.mjs'
import { shell } from './shell.mjs'

const reactAppExposeImpl: PkgExposeImpl<ReactAppExposeType> = {
  rpc: {
    'webapp/get-language': {
      guard() {
        return true
      },
      async fn() {
        let data = defaultLanguageConfig
        await kvStore.get('language', '').then(v => {
          data = v.value ?? defaultLanguageConfig
        })
        return data
      },
    },
  },
}

export const expose = await shell.expose(reactAppExposeImpl)
