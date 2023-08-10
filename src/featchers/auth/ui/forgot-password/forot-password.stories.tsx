import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from './forgot-password.tsx'

const meta = {
  title: 'auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordStory: Story = {}
