import type { Meta, StoryObj } from '@storybook/react'
import { ActionMeta, SingleValue } from 'react-select'

import { Pagination } from './index.ts'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  // argTypes: { onChangeOption: { action: 'select changes' } },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const onChangePaginatorFake = (page: number) => {
  console.log(page)
}
const onPerPageFake = (newValue: SingleValue<number>, actionMeta: ActionMeta<number>) => {
  console.log(newValue)
  console.log(actionMeta)
}

export const PaginationStory: Story = {
  args: {
    onChange: onChangePaginatorFake,
    count: 10,
    page: 1,
    perPage: 1,
    perPageOptions: [1, 2, 3, 4, 5],
    onPerPageChange: onPerPageFake,
  },
}
