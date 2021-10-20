import { ComponentMeta, ComponentStory } from '@storybook/react'
import { TextCard, TextCardProps } from './TextCard'

const meta: ComponentMeta<typeof TextCard> = {
  title: 'Molecules/Cards/TextCard',
  component: TextCard,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  excludeStories: ['TextCardStoryProps'],
  decorators:[
    (Story)=>(<div style={{height:100,width:300}}><Story/></div>)
  ]
}

export const TextCardStoryProps: TextCardProps = {}

const TextCardStory: ComponentStory<typeof TextCard> = args => <TextCard {...args}>
  Diverse, sound, dynamic – these are the values that define BFH. And this is our MoodleNet server.&nbsp;
  <span style={{color: '#b6bacb'}}>Welcome!</span>
</TextCard>

export const Default = TextCardStory.bind({})
Default.args = TextCardStoryProps

export default meta
