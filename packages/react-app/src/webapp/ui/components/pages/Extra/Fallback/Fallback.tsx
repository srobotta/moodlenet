import { t } from '@moodlenet/core/i18n'
import type { FC } from 'react'
import { ReactComponent as HatLogo } from '../../../../assets/icons/hat-moodle.svg'
import type { MainLayoutProps } from '../../../layout/MainLayout/MainLayout.js'
import MainLayout from '../../../layout/MainLayout/MainLayout.js'
import './Fallback.scss'

export type FallbackProps = {
  mainLayoutProps: MainLayoutProps
}

export const Fallback: FC<FallbackProps> = ({ mainLayoutProps }) => {
  return (
    <MainLayout {...mainLayoutProps}>
      <div className="fallback-page">
        <div className="content">{t('page_not_found_or_access_not_allowed')}</div>
        <div className="hat-logo">
          <HatLogo />
        </div>
      </div>
    </MainLayout>
  )
}

Fallback.defaultProps = {}
