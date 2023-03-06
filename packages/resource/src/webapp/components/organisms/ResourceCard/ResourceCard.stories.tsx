import { ContentBackupImages, href, TagListStory } from '@moodlenet/react-app/ui'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ResourceCard, { ResourceCardProps } from './ResourceCard.js'

const meta: ComponentMeta<typeof ResourceCard> = {
  title: 'Molecules/ResourceCard',
  component: ResourceCard,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  excludeStories: [
    'ResourceCardStoryProps',
    'ResourceCardLoggedOutStoryProps',
    'ResourceCardLoggedInStoryProps',
    'ResourceCardOwnerStoryProps',
    'ResourceCardOwnerBookmarkedStoryProps',
    'ResourceCardOwnerPrivateStoryProps',
  ],
  decorators: [
    Story => (
      <div style={{ height: 100, width: 300 }}>
        <Story />
      </div>
    ),
  ],
}

export const getResourceCardStoryProps = (
  i?: 0 | 1,
  overrides?: Partial<ResourceCardProps>,
): ResourceCardProps => {
  return {
    resourceId: `${Math.floor(Math.random() * ContentBackupImages.length)}`,
    tags: TagListStory,
    isCreator: false,
    title: `Why the  ${
      Math.random() < 0.5 ? 'tropical rainforests are' : 'the oceans are'
    } the world's most important ecosystems`,
    image:
      i === 0
        ? 'https://images.unsplash.com/photo-1442120108414-42e7ea50d0b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1249&q=80'
        : null,
    type: 'Video',
    resourceHomeHref: href('Pages/Resource/Logged In'),
    isAuthenticated: true,
    bookmarked: false,
    liked: false,
    numLikes: 23,
    isPublished: true,
    canEdit: false,
    publish: action('publish resource'),
    setIsPublished: action('publish resource'),
    owner: {
      profileHref: href('Pages/Profile/Logged In'),
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      displayName: 'Karl Phosler',
    },
    ...overrides,
  }
}

export const ResourceCardLoggedInStoryProps: ResourceCardProps = {
  ...getResourceCardStoryProps(),
}

export const ResourceCardLoggedOutStoryProps = (i?: 0 | 1): ResourceCardProps => {
  return {
    ...getResourceCardStoryProps(i),
    isAuthenticated: false,
  }
}

export const ResourceCardOwnerStoryProps: ResourceCardProps = {
  ...ResourceCardLoggedInStoryProps,
  isCreator: true,
}

export const ResourceCardOwnerPrivateStoryProps: ResourceCardProps = {
  ...ResourceCardLoggedInStoryProps,
  isCreator: true,
  isPublished: false,
}

export const ResourceCardOwnerBookmarkedStoryProps: ResourceCardProps = {
  ...ResourceCardOwnerStoryProps,
  bookmarked: true,
}

const ResourceCardStory: ComponentStory<typeof ResourceCard> = args => <ResourceCard {...args} />

export const LoggedIn = ResourceCardStory.bind({})
LoggedIn.args = ResourceCardLoggedInStoryProps

export const LoggedOut = ResourceCardStory.bind({})
LoggedOut.args = ResourceCardLoggedOutStoryProps()

export const Owner = ResourceCardStory.bind({})
Owner.args = ResourceCardOwnerStoryProps

export const Public = ResourceCardStory.bind({})
Public.args = ResourceCardOwnerStoryProps

export const Private = ResourceCardStory.bind({})
Private.args = ResourceCardOwnerPrivateStoryProps

export const VerticalLoggedIn = ResourceCardStory.bind({})
VerticalLoggedIn.args = {
  ...ResourceCardLoggedInStoryProps,
  orientation: 'vertical',
  liked: true,
}

export const VerticalLoggedOut = ResourceCardStory.bind({})
VerticalLoggedOut.args = {
  ...ResourceCardLoggedOutStoryProps,
  orientation: 'vertical',
}

export const VerticalOwner = ResourceCardStory.bind({})
VerticalOwner.args = { ...ResourceCardOwnerStoryProps, orientation: 'vertical' }

export const VerticalPublic = ResourceCardStory.bind({})
VerticalPublic.args = {
  ...ResourceCardOwnerStoryProps,
  orientation: 'vertical',
}

export const VerticalPrivate = ResourceCardStory.bind({})
VerticalPrivate.args = {
  ...ResourceCardOwnerPrivateStoryProps,
  orientation: 'vertical',
}

export default meta
