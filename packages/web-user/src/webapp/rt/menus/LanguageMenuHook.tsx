import { getLanguagesIso, setLang } from '@moodlenet/core/i18n'
import { useMemo } from 'react'
import type { LanguageSelectorItem, LanguageSelectorProps } from '../../ui/exports/ui.mjs'

export function useLanguageSelectorProps(): LanguageSelectorProps {
  const menuItems = getLanguagesIso().map((lang): LanguageSelectorItem => {
    const onClick = () => {
      setLang(lang)
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
