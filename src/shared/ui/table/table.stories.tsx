import type { Meta, StoryObj } from '@storybook/react'

import { Table } from './index.ts'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const ShowTable: Story = {}
