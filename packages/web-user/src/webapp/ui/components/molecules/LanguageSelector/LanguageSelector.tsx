import type { FloatingMenuContentItem } from '@moodlenet/component-library'
import { FloatingMenu } from '@moodlenet/component-library'
import { t } from '@moodlenet/react-app/webapp'
import type { ComponentType, FC } from 'react'
import { useMemo } from 'react'
import { ReactComponent as GlobeIcon } from '../../../assets/icons/globe.svg'

export type LanguageSelectorItem = {
  Component: ComponentType
  key: string
  className?: string
}
export type LanguageSelectorProps = {
  menuItems: LanguageSelectorItem[]
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ menuItems }) => {
  const menuContent = useMemo<FloatingMenuContentItem[]>(() => {
    return [
      ...menuItems.map(({ Component, key, className = '' }) => {
        const floatingMenuContentItem: FloatingMenuContentItem = {
          Element: <Component key={key} />,
          wrapperClassName: `lang-menu-item lang-${key} ${className}`,
        }
        // reoderedmenuItems.map((menuItem, i) => {
        return floatingMenuContentItem
      }),
    ]
  }, [menuItems])

  return (
    <FloatingMenu
      className="lang-menu"
      key="lang-menu"
      abbr={t('select_language')}
      menuContent={menuContent}
      hoverElement={<GlobeIcon className="globe-icon" tabIndex={0} />}
    />
  )
}
