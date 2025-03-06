import { getCurrentLang, t } from '@moodlenet/core/i18n'
import type { FC } from 'react'
import { ReactComponent as HelpIcon } from '../../ui/assets/icons/help.svg'
export const HelpMenuContainer: FC = () => {
  const target = `${window.location.protocol}//${
    window.location.host
  }/manual/index-${getCurrentLang()}.html`.replace(/-de./, '.')
  const helpIcon = <HelpIcon className="help-icon" title={t('help')} />
  const onClick = () => {
    window.location.href = target
  }
  return (
    <a style={{ cursor: 'pointer' }} onClick={onClick}>
      {helpIcon}
    </a>
  )
}
