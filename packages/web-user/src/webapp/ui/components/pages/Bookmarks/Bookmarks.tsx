import { t } from '@moodlenet/core/i18n'
import type { BrowserPropsData, MainLayoutProps } from '@moodlenet/react-app/ui'
import { Browser, MainLayout } from '@moodlenet/react-app/ui'
import type { FC } from 'react'

export type BookmarksProps = {
  mainLayoutProps: MainLayoutProps
  browserProps: BrowserPropsData
}
export const Bookmarks: FC<BookmarksProps> = ({ mainLayoutProps, browserProps }) => {
  return (
    <MainLayout {...mainLayoutProps}>
      <div className="bookmarks">
        <Browser {...browserProps} title={t('bookmarks')} />
      </div>
    </MainLayout>
  )
}
Bookmarks.displayName = 'BookmarksPage'
