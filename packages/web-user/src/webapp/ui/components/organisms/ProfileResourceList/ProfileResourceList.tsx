import { ListCard, PrimaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import type { ResourceCardProps } from '@moodlenet/ed-resource/ui'
import { ResourceCard } from '@moodlenet/ed-resource/ui'
import type { ProxyProps } from '@moodlenet/react-app/ui'
import { NoteAdd } from '@mui/icons-material'
import type { FC } from 'react'
import { useMemo } from 'react'
import './ProfileResourceList.scss'

export type ProfileResourceListProps = {
  resourceCardPropsList: { key: string; props: ProxyProps<ResourceCardProps> }[]
  createResource(): void
  canEdit: boolean
}

export const ProfileResourceList: FC<ProfileResourceListProps> = ({
  resourceCardPropsList,
  createResource,
  canEdit,
}) => {
  const listCard = (
    <ListCard
      className="profile-resource-list"
      content={useMemo(
        () =>
          resourceCardPropsList.map(({ key, props }) => {
            return { key, el: <ResourceCard key={key} {...props} orientation="horizontal" /> }
          }),
        [resourceCardPropsList],
      )}
      header={t('latest_resources')}
      actions={
        canEdit
          ? {
              element: (
                <PrimaryButton className="action" onClick={createResource}>
                  <NoteAdd />
                  {t('new_resource')}
                </PrimaryButton>
              ),
              position: 'end',
            }
          : undefined
      }
    />
  )

  return canEdit || resourceCardPropsList.length > 0 ? listCard : null
}

ProfileResourceList.defaultProps = {}

export default ProfileResourceList
