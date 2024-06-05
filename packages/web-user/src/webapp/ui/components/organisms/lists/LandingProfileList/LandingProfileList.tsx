import type { Href } from '@moodlenet/component-library'
import { ListCard } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import type { ProxyProps } from '@moodlenet/react-app/ui'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { ProfileCardProps } from '../../ProfileCard/ProfileCard.js'
import { ProfileCard } from '../../ProfileCard/ProfileCard.js'
import './LandingProfileList.scss'

export type LandingProfileListProps = {
  searchAuthorsHref: Href
  profilesPropsList: { props: ProxyProps<ProfileCardProps>; key: string }[]
  hasSetInterests: boolean
}

export const LandingProfileList: FC<LandingProfileListProps> = ({
  profilesPropsList,
  hasSetInterests,
  // searchAuthorsHref,
}) => {
  const title = (
    <div className="title">
      {hasSetInterests ? t('user_title_featured_authors') : t('title_featured_authors')}
    </div>
  )

  const subtitle = (
    <div className="subtitle">
      {hasSetInterests ? t('user_subtitle_featured_authors') : t('subtitle_featured_authors')}
    </div>
  )

  return (
    <ListCard
      className={`landing-profile-list`}
      content={useMemo(
        () =>
          profilesPropsList
            .slice(0, 11)
            .map(({ key, props }) => ({ key, el: <ProfileCard key={key} {...props} /> })),
        [profilesPropsList],
      )}
      header={
        <div className="card-header">
          <div className="info">
            {title}
            {subtitle}
          </div>
        </div>
      }
      noCard={true}
      minGrid={170}
      maxRows={2}
    />
  )
}

LandingProfileList.defaultProps = {}

export default LandingProfileList
