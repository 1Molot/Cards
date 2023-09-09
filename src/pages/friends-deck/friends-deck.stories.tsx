import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../shared/utils'

import { FriendsDeck } from './friends-deck.tsx'

const meta = {
  title: 'Page/FriendsDeck',
  component: FriendsDeck,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof FriendsDeck>

export default meta
type Story = StoryObj<typeof meta>

export const FriendsDeckStory: Story = {}
