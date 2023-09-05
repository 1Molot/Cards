import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../shared/utils'

import { EmptyDeck } from './empty-deck.tsx'

const meta = {
  title: 'Page/EmptyDeck',
  component: EmptyDeck,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof EmptyDeck>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyDeckStory: Story = {}
