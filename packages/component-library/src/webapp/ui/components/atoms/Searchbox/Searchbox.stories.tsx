import { action } from '@storybook/addon-actions'
import type { Meta as ComponentMeta, StoryFn as ComponentStory } from '@storybook/react'
import { t } from '@moodlenet/react-app/webapp'
import type { SearchboxProps } from './Searchbox.js'
import { Searchbox } from './Searchbox.js'

const meta: ComponentMeta<typeof Searchbox> = {
  title: 'Atoms/Searchbox',
  component: Searchbox,
  excludeStories: ['SearchboxStoryProps'],
  parameters: {
    layout: 'centered',
  },
}

export const SearchboxStoryProps: SearchboxProps = {
  placeholder: {t('start_type_to_search')},
  searchText: '',
  setSearchText: action('{t('search_text')}'),
  search: action('{t('search')}'),
}

const SearchboxStory: ComponentStory<typeof Searchbox> = args => <Searchbox {...args} />

export const Default: typeof SearchboxStory = SearchboxStory.bind({})
Default.args = SearchboxStoryProps

export default meta
