import { ListCard, TertiaryButton } from '@moodlenet/component-library'
import type { ProxyProps } from '@moodlenet/react-app/ui'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { CollectionCardProps } from '../../CollectionCard/CollectionCard.js'
import { CollectionCard } from '../../CollectionCard/CollectionCard.js'
import './BrowserCollectionList.scss'

export type BrowserCollectionListProps = {
  collectionCardPropsList: { props: ProxyProps<CollectionCardProps>; key: string }[]
  showAll: boolean
  setShowAll: React.Dispatch<React.SetStateAction<string | undefined>>
  loadMore: (() => unknown) | null
}

export const BrowserCollectionList: FC<BrowserCollectionListProps> = ({
  collectionCardPropsList,
  showAll,
  setShowAll,
  loadMore,
}) => {
  return (
    <ListCard
      className={`browser-collection-list ${showAll ? 'show-all' : ''} ${
        loadMore ? 'load-more' : ''
      }`}
      content={useMemo(
        () =>
          collectionCardPropsList.map(({ key, props }) => <CollectionCard key={key} {...props} />),
        [collectionCardPropsList],
      )}
      header={
        <div className="card-header">
          <div className="title">Collections</div>
        </div>
      }
      footer={
        showAll ? (
          loadMore ? (
            <TertiaryButton onClick={loadMore}>Load more</TertiaryButton>
          ) : null
        ) : (
          <TertiaryButton onClick={() => setShowAll('collection-list')}>
            See all collection results
          </TertiaryButton>
        )
      }
      minGrid={showAll ? 300 : 240}
      maxRows={showAll ? undefined : 2}
    />
  )
}

BrowserCollectionList.defaultProps = {}

export default BrowserCollectionList