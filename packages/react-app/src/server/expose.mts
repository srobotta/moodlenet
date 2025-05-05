import type { PkgExposeImpl } from '@moodlenet/core'
import type { ReactAppExposeType } from '../common/expose-def.mjs'
import { kvStore } from '../server/init/kvStore.mjs'
import { shell } from './shell.mjs'

const reactAppExposeImpl: PkgExposeImpl<ReactAppExposeType> = {
  rpc: {
    'webapp/get-userconfig': {
      guard() {
        return true
      },
      async fn() {
        await kvStore.get('userCfg', '').then(v => {
          return v.value ?? { registerEnabled: true }
        })
        return true
      },
    },
  },
}

export const expose = await shell.expose(reactAppExposeImpl)
