import { t } from '@moodlenet/core/i18n'
import { LibraryAdd, NoteAdd } from '@mui/icons-material'
import type { FC } from 'react'

export type CreateResourceAddMenuItemProps = { createResource(): void }
export const CreateResourceAddMenuItem: FC<{ createResource(): void }> = ({ createResource }) => (
  <div onClick={createResource}>
    <NoteAdd />
    {t('new_resource')}
  </div>
)

export type CreateCollectionAddMenuItemProps = { createCollection(): void }
export const CreateCollectionAddMenuItem: FC<CreateCollectionAddMenuItemProps> = ({
  createCollection,
}) => (
  <div onClick={createCollection}>
    <LibraryAdd />
    {t('new_collection')}
  </div>
)
