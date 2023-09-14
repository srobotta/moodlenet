import type { TextOptionProps } from '@moodlenet/component-library'
import { DropdownFilterField } from '@moodlenet/ed-meta/ui'
import type { SortType } from '@moodlenet/react-app/ui'
import { SortBy } from '@moodlenet/react-app/ui'

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
    title={'Language'}
    selection={selected}
    setselection={setSelected}
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
    title={'License'}
    selection={selected}
    setselection={setSelected}
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
    title={'Level'}
    selection={selected}
    setselection={setSelected}
    options={options}
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
    title={'Type'}
    selection={selected}
    setselection={setSelected}
    options={options}
  />
)

export const BrowserResourceFilters = {
  SortByItem,
  SortByLanguageItem,
  SortByLicenseItem,
  SortByLevelItem,
  SortByTypeItem,
}
