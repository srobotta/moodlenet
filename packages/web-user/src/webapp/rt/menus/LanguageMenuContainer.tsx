import type { FC } from 'react'
import { LanguageSelector } from '../../ui/components/molecules/LanguageSelector/LanguageSelector.js'
import { useLanguageSelectorProps } from './LanguageMenuHook.js'

export const LanguageMenuContainer: FC = () => {
  const langMenuProps = useLanguageSelectorProps()
  return <LanguageSelector {...langMenuProps} />
}
