import type { BrowserPropsData, MainLayoutProps } from '@moodlenet/react-app/ui'
import { Browser, MainLayout } from '@moodlenet/react-app/ui'
import type { FC } from 'react'
import { t } from '@moodlenet/react-app/webapp'

export type FollowersProps = {
  mainLayoutProps: MainLayoutProps
  browserProps: BrowserPropsData
  profileName: string
  isCreator: boolean
}
export const Followers: FC<FollowersProps> = ({
  mainLayoutProps,
  browserProps,
  profileName,
  isCreator,
}) => {
  return (
    <MainLayout {...mainLayoutProps}>
      <div className="followers">
        <Browser
          {...browserProps}
          title={isCreator ? {t('my_followers')} : `${profileName}${t('s_followers')}`}
          showFilters={false}
        />
      </div>
    </MainLayout>
  )
}
Followers.displayName = 'FollowersPage'
