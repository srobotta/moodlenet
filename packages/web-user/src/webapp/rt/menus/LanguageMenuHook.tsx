import { i18n } from '@moodlenet/react-app/webapp'
import { useMemo } from 'react'
import type { LanguageSelectorItem, LanguageSelectorProps } from '../../ui/exports/ui.mjs'

export function useLanguageSelectorProps(): LanguageSelectorProps {
  const menuItems = i18n.getLanguagesIso().map((lang): LanguageSelectorItem => {
    const onClick = () => {
      i18n.setLang(lang)
      window.location.reload()
    }
    const cmp: React.FC = () => {
      return <a onClick={onClick}>{lang}</a>
    }
    return {
      Component: cmp,
      key: lang,
    }
  })
  const langMenuProps = useMemo<LanguageSelectorProps>(() => {
    const langMenuProps: LanguageSelectorProps = {
      menuItems,
    }
    return langMenuProps
  }, [menuItems])
  return langMenuProps
}
