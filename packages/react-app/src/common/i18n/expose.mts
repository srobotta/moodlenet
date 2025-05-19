import type { PkgExposeImpl } from '@moodlenet/core'
import { pkgRegistry } from '@moodlenet/core'
import type { I18nExposeType } from '../expose-def.mjs'
import { shell } from './shell.mjs'

const i18nExposeImpl: PkgExposeImpl<I18nExposeType> = {
  rpc: {
    pkgList: {
      guard: () => void 0,
      async fn() {
        const pkgInfos = pkgRegistry.listEntries()
        return pkgInfos
      },
    },
  },
}

export const expose = await shell.expose(i18nExposeImpl)
