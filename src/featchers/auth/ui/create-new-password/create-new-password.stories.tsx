import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../../../../shared/utils'

import { CreateNewPassword } from './create-new-password.tsx'

const meta = {
  title: 'auth/CreateNewPassword',
  component: CreateNewPassword,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator, ReduxStoreProviderDecorator],
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordStory: Story = {}
