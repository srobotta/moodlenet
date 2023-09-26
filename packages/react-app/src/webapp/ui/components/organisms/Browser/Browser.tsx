import type { AddonItem } from '@moodlenet/component-library'
import { SecondaryButton, SimpleDropdown } from '@moodlenet/component-library'
import type { ComponentType, FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import './Browser.scss'

export type BrowserMainColumnItemBase = {
  showAll: boolean
  setShowAll(): void
  showHeader?: boolean
}

export type MainColumItem = {
  Item: ComponentType<BrowserMainColumnItemBase>
  name: string
  filters: AddonItem[]
  // numElements: number // the amount of elements in the Item list
  key: string
}

export type BrowserProps = BrowserPropsData & BrowserPropsUI

export type BrowserPropsData = {
  mainColumnItems: MainColumItem[]
}

export type BrowserPropsUI = {
  showFilters?: boolean
  title?: string
}

export const Browser: FC<BrowserProps> = ({ mainColumnItems, title, showFilters }) => {
  const mainColumnRef = useRef<HTMLDivElement>(null)
  const [currentMainFilter, setCurrentMainFilter] = useState<string | number | undefined>(undefined)
  const [currentFilters, setCurrentFilters] = useState<AddonItem[] | undefined>([])

  const filterByItemType = useMemo(() => {
    return mainColumnItems
      ? mainColumnItems
          .map(e => {
            // if (e.numElements === 0) return null
            const isCurrent = e.key === currentMainFilter

            const options = mainColumnItems.map(i => {
              return { label: i.name, value: i.key }
            })
            options.push({ label: 'All', value: 'all' })

            return isCurrent || !currentMainFilter ? (
              isCurrent ? (
                <SimpleDropdown
                  className={`content-type-filter`}
                  options={options}
                  selected={[e.key]}
                  label={e.name}
                  onClick={(key: string | number) => {
                    setCurrentMainFilter(key === 'all' ? undefined : key)
                  }}
                />
              ) : (
                <SecondaryButton
                  key={e.key}
                  className={`content-type-filter filter-element ${isCurrent ? 'selected' : ''}`}
                  onClick={() => {
                    setCurrentMainFilter(e.key)
                  }}
                  color="grey"
                >
                  <span>{e.name}</span>
                </SecondaryButton>
              )
            ) : null
          })
          .filter(item => !!item)
      : []
  }, [mainColumnItems, currentMainFilter])

  useEffect(() => {
    mainColumnItems?.map(e => e.key === currentMainFilter && setCurrentFilters(e.filters))
  }, [currentMainFilter, mainColumnItems])

  const filters =
    currentFilters && currentFilters.length > 0 ? (
      <>
        {currentFilters.map(i => (
          <i.Item key={i.key} />
        ))}
      </>
    ) : null

  const updatedMainColumnItems = [...(mainColumnItems ?? [])].filter(
    (item): item is MainColumItem /* | JSX.Element */ => !!item,
  )

  // scroll to top when changing the main filter
  useEffect(() => {
    document.body.scrollTo(0, 0)
  }, [currentMainFilter])

  const extraFilters =
    currentMainFilter && currentFilters && currentFilters.length > 0 ? (
      <>
        {/* <div className="separator" /> */}
        {filters}
        {/* <div className="separator"></div>
        <SecondaryButton className={`filter-element`} color="grey">
          All filters
        </SecondaryButton> */}
        {/* <TertiaryButton onClick={() => setCurrentMainFilter(undefined)}>Reset</TertiaryButton> */}
      </>
    ) : null

  return (
    <div className={`browser ${showFilters ? 'show-filters' : ''}`}>
      {showFilters && (
        <div className="filter-bar">
          <div className="filter-bar-content">
            {filterByItemType.filter(e => !!e)}
            {extraFilters && <div className="separator" />}
            {extraFilters}
          </div>
        </div>
      )}
      <div className="content">
        <div className={`main-column ${currentMainFilter ? 'full-width' : ''}`} ref={mainColumnRef}>
          {title && <div className="title">{title}</div>}
          {useMemo(
            () =>
              updatedMainColumnItems.map(i =>
                !currentMainFilter || i.key === currentMainFilter ? (
                  'Item' in i ? (
                    <i.Item
                      key={i.key}
                      showAll={i.key === currentMainFilter || mainColumnItems?.length === 1}
                      setShowAll={() => setCurrentMainFilter(i.key)}
                      showHeader={mainColumnItems?.length > 1}
                    />
                  ) : (
                    i
                  )
                ) : null,
              ),
            [updatedMainColumnItems, currentMainFilter, mainColumnItems?.length],
          )}
        </div>
      </div>
    </div>
  )
}

Browser.defaultProps = { showFilters: true }
Browser.displayName = 'Browser'

export default Browser
