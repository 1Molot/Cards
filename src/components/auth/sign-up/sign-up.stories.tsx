import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './sign-up.tsx'

const meta = {
  title: 'Auth/SignUn',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Sign_In: Story = {}
