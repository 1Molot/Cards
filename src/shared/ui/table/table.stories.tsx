import type { Meta, StoryObj } from '@storybook/react'

import { DeskTable } from './index.ts'

const meta = {
  title: 'Components/Table',
  component: DeskTable,
  tags: ['autodocs'],
} satisfies Meta<typeof DeskTable>

export default meta
type Story = StoryObj<typeof meta>

export const ShowTable: Story = {}
