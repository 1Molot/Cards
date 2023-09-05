import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../shared/utils'

import { DecksList } from './decks-list.tsx'

const meta = {
  title: 'Page/DecksList',
  component: DecksList,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof DecksList>

export default meta
type Story = StoryObj<typeof meta>

export const DecksListStory: Story = {}
