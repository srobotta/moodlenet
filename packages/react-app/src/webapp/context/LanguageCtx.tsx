import type { FC, PropsWithChildren } from 'react'
import { createContext, useMemo, useState } from 'react'
import { init as initI18n } from '../../common/i18n/i18n.mjs'
import type { LanguageConfig } from '../../common/i18n/types.mjs'
import { shell } from '../shell.mjs'

export type TLanguageCtx = {
  language: LanguageConfig
}

export const LanguageCtx = createContext<TLanguageCtx>(null as any)

const lang = await shell.rpc.me('webapp/get-language')()
await initI18n(lang)

export const ProviderLanguageCtx: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [language] = useState<LanguageConfig>(lang)
  const ctxValue = useMemo<TLanguageCtx>(() => {
    return {
      language,
    }
  }, [language])
  return <LanguageCtx.Provider value={ctxValue}>{children}</LanguageCtx.Provider>
}
