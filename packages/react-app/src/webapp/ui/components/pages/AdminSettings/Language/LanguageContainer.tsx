import type { FC } from 'react'
import { Language } from './Language.js'
import { useLanguageProps } from './LanguageHooks.js'

export const LanguageContainer: FC = () => {
  const languageProps = useLanguageProps()
  return <Language {...languageProps} />
}
