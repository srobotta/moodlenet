import { ListCard, TertiaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import type { BrowserMainColumnItemBase, ProxyProps } from '@moodlenet/react-app/ui'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { SubjectCardProps } from '../SubjectCard/SubjectCard.js'
import { SubjectCard } from '../SubjectCard/SubjectCard.js'
import './BrowserSubjectList.scss'

export type BrowserSubjectListDataProps = {
  subjectCardPropsList: { props: ProxyProps<SubjectCardProps>; key: string }[]
  loadMore: (() => unknown) | null
}
export type BrowserSubjectListProps = BrowserSubjectListDataProps & BrowserMainColumnItemBase

export const BrowserSubjectList: FC<BrowserSubjectListProps> = ({
  subjectCardPropsList,
  showAll,
  setShowAll,
  loadMore,
  showHeader,
}) => {
  const listCard = (
    <ListCard
      className={`browser-subject-list ${showAll ? 'show-all' : ''} ${loadMore ? 'load-more' : ''}`}
      content={useMemo(
        () =>
          subjectCardPropsList.map(({ key, props }) => ({
            key,
            el: <SubjectCard key={key} {...props} />,
          })),
        [subjectCardPropsList],
      )}
      direction="horizontal"
      header={
        showHeader && (
          <div className="card-header">
            <div className="title">{t('subjects')}</div>
          </div>
        )
      }
      footer={
        showAll ? (
          loadMore ? (
            <TertiaryButton onClick={loadMore}>{t('load_more')}</TertiaryButton>
          ) : null
        ) : (
          <TertiaryButton onClick={setShowAll}>{t('see_all_subject_result')}</TertiaryButton>
        )
      }
      // minGrid={showAll ? 300 : 240}
      maxRows={showAll ? undefined : 3}
    />
  )

  return subjectCardPropsList.length > 0 ? listCard : null
}

BrowserSubjectList.defaultProps = { showHeader: true }

export default BrowserSubjectList
