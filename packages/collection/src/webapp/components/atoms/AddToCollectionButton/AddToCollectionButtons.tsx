import type { OptionItemProp } from '@moodlenet/component-library'
import {
  AddToCollectionsCard,
  Modal,
  OptionItem,
  PrimaryButton,
  SecondaryButton,
} from '@moodlenet/component-library'
import type { SelectOptionsMulti } from '@moodlenet/react-app/ui'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { t } from '@moodlenet/react-app/webapp'

export type AddToCollectionButtonProps = {
  collections: SelectOptionsMulti<OptionItemProp>
  add(id: string): void
  remove(id: string): void
}

export const AddToCollectionButton: FC<AddToCollectionButtonProps> = ({
  collections,
  add,
  remove,
}) => {
  const [isAddingToCollection, setIsAddingToCollection] = useState<boolean>(false)
  const selectedValues = useMemo(
    () => collections.selected.map(({ value }) => value),
    [collections.selected],
  )

  const modal = isAddingToCollection && collections && (
    <Modal
      title={t('select_collections')}
      actions={
        <PrimaryButton
          onClick={() => {
            setIsAddingToCollection(false)
          }}
        >
          {t('done')}
        </PrimaryButton>
      }
      onClose={() => setIsAddingToCollection(false)}
      style={{ maxWidth: '400px' }}
    >
      <AddToCollectionsCard
        header={false}
        noCard={true}
        onItemSelect={add}
        onItemDeselect={remove}
        value={selectedValues}
      >
        {collections.opts.map(({ label, value }) => (
          <OptionItem key={value} label={label !== '' ? label : {t('unnamed')}} value={value} />
        ))}
      </AddToCollectionsCard>
    </Modal>
  )

  return (
    <>
      {modal}
      <SecondaryButton onClick={() => setIsAddingToCollection(true)}>
      {t('add_to_collection')}
      </SecondaryButton>
    </>
  )
}
