import { setLang } from '@moodlenet/react-app/common'
import { LanguageCtx } from '@moodlenet/react-app/webapp'
import { useContext, useMemo } from 'react'
import type { LanguageSelectorItem, LanguageSelectorProps } from '../../ui/exports/ui.mjs'

export function useLanguageSelectorProps(): LanguageSelectorProps {
  const { language } = useContext(LanguageCtx)
  const menuItems = language.languages.available.map((lang): LanguageSelectorItem => {
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
