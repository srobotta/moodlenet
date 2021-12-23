import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SBFormikBag } from '../../../../lib/storybook/SBFormikBag'
import { VisibilityDropdown } from '../../NewResource/FieldsData'
import { NewCollectionFormValues } from '../types'
import { CreateCollection, CreateCollectionProps } from './CreateCollection'

const meta: ComponentMeta<typeof CreateCollection> = {
  title: 'Pages/New Resource/Create Collection',
  component: CreateCollection,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  excludeStories: ['CreateCollectionStoryProps', 'Default'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1100 }}>
        <Story />
      </div>
    ),
  ],
}

export const CreateCollectionStoryProps: CreateCollectionProps = {
  finish: action('nextStep'),
  formBag: SBFormikBag<NewCollectionFormValues>({
    title: '',
    visibility: 'Private',
    description: '',
    imageUrl: '',
    image: '',
    // resources: [],
  }),
  imageUrl: '',
  visibility: VisibilityDropdown,
  step: 'CreateCollectionStep',
}

const CreateCollectionStory: ComponentStory<typeof CreateCollection> = (
  args
) => <CreateCollection {...args} />

export const Default = CreateCollectionStory.bind({})
Default.args = CreateCollectionStoryProps

export default meta