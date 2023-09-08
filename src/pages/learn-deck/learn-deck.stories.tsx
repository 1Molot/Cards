import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../shared/utils'

import { LearnDeck } from './learn-deck.tsx'

const meta = {
  title: 'Page/LearnDeck',
  component: LearnDeck,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} satisfies Meta<typeof LearnDeck>

export default meta
type Story = StoryObj<typeof meta>

export const LearnDeckStory: Story = {}
