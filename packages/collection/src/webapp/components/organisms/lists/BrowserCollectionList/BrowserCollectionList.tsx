import { ListCard, TertiaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import type { BrowserMainColumnItemBase, ProxyProps } from '@moodlenet/react-app/ui'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { CollectionCardProps } from '../../CollectionCard/CollectionCard.js'
import { CollectionCard } from '../../CollectionCard/CollectionCard.js'
import './BrowserCollectionList.scss'

export type BrowserCollectionListDataProps = {
  collectionCardPropsList: { props: ProxyProps<CollectionCardProps>; key: string }[]
  loadMore: (() => unknown) | null
}
export type BrowserCollectionListProps = BrowserCollectionListDataProps & BrowserMainColumnItemBase

export const BrowserCollectionList: FC<BrowserCollectionListProps> = ({
  collectionCardPropsList,
  showAll,
  setShowAll,
  loadMore,
  showHeader,
}) => {
  const listCard = (
    <ListCard
      className={`browser-collection-list ${showAll ? 'show-all' : ''} ${
        loadMore ? 'load-more' : ''
      }`}
      content={useMemo(
        () =>
          collectionCardPropsList.map(({ key, props }) => ({
            key,
            el: <CollectionCard key={key} {...props} />,
          })),
        [collectionCardPropsList],
      )}
      header={
        showHeader && (
          <div className="card-header">
            <div className="title">{t('collections')}</div>
          </div>
        )
      }
      footer={
        showAll ? (
          loadMore ? (
            <TertiaryButton onClick={loadMore}>Load more</TertiaryButton>
          ) : null
        ) : (
          <TertiaryButton onClick={setShowAll}>{t('see_all_collection_result')}</TertiaryButton>
        )
      }
      minGrid={showAll ? 300 : 240}
      maxRows={showAll ? undefined : 2}
    />
  )

  return collectionCardPropsList.length > 0 ? listCard : null
}

BrowserCollectionList.defaultProps = { showHeader: true }

export default BrowserCollectionList
