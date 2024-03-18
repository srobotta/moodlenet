import { LibraryAdd as LibraryAddIcon, NoteAdd as NoteAddIcon } from '@mui/icons-material'
import type { Meta as ComponentMeta, StoryFn as ComponentStory } from '@storybook/react'
import addIcon from '../../../assets/icons/add-round.svg'
import type { FloatingMenuProps } from './FloatingMenu.js'
import { FloatingMenu } from './FloatingMenu.js'
//import { t } from '@moodlenet/core/i18n'
const t = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')
}
const meta: ComponentMeta<typeof FloatingMenu> = {
  title: 'Atoms/FloatingMenu',
  component: FloatingMenu,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  excludeStories: ['FloatingMenuStoryProps'],
  decorators: [
    Story => (
      <div style={{ position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}

export const FloatingMenuStoryProps: FloatingMenuProps = {
  hoverElement: <img className="add-icon" src={addIcon} alt="{t('add')}" />,
  menuContent: [
    {
      Element: (
        <div key="__">
          <div>
            <NoteAddIcon />
            {t('new_resource')}
          </div>
          <div>
            <LibraryAddIcon />
            {t('new_collection')}
          </div>
        </div>
      ),
    },
  ],
}

const FloatingMenuStory: ComponentStory<typeof FloatingMenu> = args => (
  <FloatingMenu {...args}>
    <div>This</div>
    <div>And that</div>
  </FloatingMenu>
)

export const Default: typeof FloatingMenuStory = FloatingMenuStory.bind({})
Default.args = FloatingMenuStoryProps

export default meta
