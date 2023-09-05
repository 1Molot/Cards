import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../shared/utils'

import { MyDeck } from './my-deck.tsx'

const meta = {
  title: 'Page/MyPack',
  component: MyDeck,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof MyDeck>

export default meta
type Story = StoryObj<typeof meta>

export const MyDeckStory: Story = {}
