import type { Meta, StoryObj } from '@storybook/react'

// @ts-ignore
import AvatarInCard from '../../../assets/icons/avatar-default.png'

import { AvatarDemo } from './avatar.tsx'

const meta = {
  title: 'Components/Avatar',
  component: AvatarDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: AvatarInCard,
  },
}
