import { SimpleDropdown } from '@moodlenet/component-library'
import type { FC } from 'react'
import { t } from '../../../../../../common/i18n/i18n.mjs'
export type SortType = 'Relevant' | 'Popular' | 'Recent'
export type SortByProps = {
  selected: SortType
  setSelected: (e: SortType) => void
}
const sortTypes: SortType[] = ['Relevant', 'Popular', 'Recent']
const sortTypesList = sortTypes.map(name => ({
  label: t(`sort_by_${name.toLowerCase()}`),
  value: name,
}))
export const SortBy: FC<SortByProps> = ({ selected, setSelected }) => {
  return (
    <SimpleDropdown
      options={sortTypesList}
      selected={[selected ?? 'Relevant']}
      label={t('sort_by')}
      onClick={name => setSelected(name as SortType)}
      notHighlightInitialSelection={true}
      initialSelection="Relevant"
    />
  )
}

// item is MainColumItem /* | JSX.Element */ => !!item,
