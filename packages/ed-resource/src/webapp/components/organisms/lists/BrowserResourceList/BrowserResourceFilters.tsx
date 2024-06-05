import type { TextOptionProps } from '@moodlenet/component-library'
import { SecondaryButton } from '@moodlenet/component-library'
import { t, tm } from '@moodlenet/core/i18n'
import { DropdownFilterField } from '@moodlenet/ed-meta/ui'
import type { SortType } from '@moodlenet/react-app/ui'
import { SortBy } from '@moodlenet/react-app/ui'
import { FilterAltOff } from '@mui/icons-material'

export type SortFilterElement = {
  Item: JSX.Element
  setSelected: (e: string[]) => void
}

export const SortByItem = ({
  selected,
  setSelected,
}: {
  selected: SortType
  setSelected: (e: SortType) => void
}) => <SortBy selected={selected} setSelected={setSelected} />

export const SortByLanguageItem = ({
  selected,
  setSelected,
  options,
}: {
  selected: string[]
  setSelected: (e: string[]) => void
  options: TextOptionProps[]
}) => (
  <DropdownFilterField
    title={t('language')}
    selected={selected}
    setSelected={setSelected}
    options={options}
  />
)

export const SortByLicenseItem = ({
  selected,
  setSelected,
  options,
}: {
  selected: string[]
  setSelected: (e: string[]) => void
  options: TextOptionProps[]
}) => (
  <DropdownFilterField
    title={t('license')}
    selected={selected}
    setSelected={setSelected}
    options={options}
  />
)

export const SortByLevelItem = ({
  selected,
  setSelected,
  options,
}: {
  selected: string[]
  setSelected: (e: string[]) => void
  options: TextOptionProps[]
}) => (
  <DropdownFilterField
    title={t('education_level')}
    selected={selected}
    setSelected={setSelected}
    options={options.map(e => ({ ...e, label: tm('education_level', e.value) }))}
  />
)

export const SortByTypeItem = ({
  selected,
  setSelected,
  options,
}: {
  selected: string[]
  setSelected: (e: string[]) => void
  options: TextOptionProps[]
}) => (
  <DropdownFilterField
    title={t('type')}
    selected={selected}
    setSelected={setSelected}
    options={options.map(e => ({ ...e, label: tm('content_type', e.value) }))}
  />
)

export const SortBySubjectItem = ({
  selected,
  setSelected,
  options,
}: {
  selected: string[]
  setSelected: (e: string[]) => void
  options: TextOptionProps[]
}) => (
  <DropdownFilterField
    title={t('subject')}
    selected={selected}
    setSelected={setSelected}
    options={options.map(e => ({ ...e, label: tm('subject', e.value) }))}
  />
)

export const ResetFiltersButton = ({ resetFilters }: { resetFilters(): void }) => (
  <SecondaryButton className="reset-filters-button" abbr={t('filter_reset')} onClick={resetFilters}>
    <FilterAltOff />
  </SecondaryButton>
)

export const BrowserResourceFilters = {
  SortByItem,
  SortByLanguageItem,
  SortByLicenseItem,
  SortByLevelItem,
  SortByTypeItem,
  SortBySubjectItem,
  ResetFiltersButton,
}
