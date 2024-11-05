import { getCurrentLang, t } from '@moodlenet/core/i18n'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HelpIcon } from '../../ui/assets/icons/help.svg'
export const HelpMenuContainer: FC = () => {
  const target = `/manual/index-${getCurrentLang()}.html`.replace(/-de./, '.')
  const helpIcon = <HelpIcon className="help-icon" title={t('help')} />
  return <Link to={target}>{helpIcon}</Link>
}
