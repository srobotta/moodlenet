import type { FC, PropsWithChildren } from 'react'
import { createContext, useEffect, useMemo, useState } from 'react'
import { defaultLanguageConfig, init as initI18n } from '../../common/i18n/i18n.mjs'
import type { LanguageConfig } from '../../common/i18n/types.mjs'
import { shell } from '../shell.mjs'

export type TLanguageCtx = {
  language: LanguageConfig
}

export const LanguageCtx = createContext<TLanguageCtx>(null as any)

export const ProviderLanguageCtx: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageConfig>(defaultLanguageConfig)
  useEffect(() => {
    shell.rpc
      .me('webapp/get-language')()
      .then(v => {
        setLanguage(v)
        initI18n(v)
      })
  }, [])
  const ctxValue = useMemo<TLanguageCtx>(() => {
    return {
      language,
    }
  }, [language])
  return <LanguageCtx.Provider value={ctxValue}>{children}</LanguageCtx.Provider>
}
