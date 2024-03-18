import { action } from '@storybook/addon-actions'
import type { Meta as ComponentMeta, StoryFn as ComponentStory } from '@storybook/react'
import type { SearchboxProps } from './Searchbox.js'
import { Searchbox } from './Searchbox.js'
//import { t } from '@moodlenet/core/i18n'
const t = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')
}

const meta: ComponentMeta<typeof Searchbox> = {
  title: 'Atoms/Searchbox',
  component: Searchbox,
  excludeStories: ['SearchboxStoryProps'],
  parameters: {
    layout: 'centered',
  },
}

export const SearchboxStoryProps: SearchboxProps = {
  placeholder: t('start_typing_to_search'),
  searchText: '',
  setSearchText: action('Search text'),
  search: action('Search'),
}

const SearchboxStory: ComponentStory<typeof Searchbox> = args => <Searchbox {...args} />

export const Default: typeof SearchboxStory = SearchboxStory.bind({})
Default.args = SearchboxStoryProps

export default meta
