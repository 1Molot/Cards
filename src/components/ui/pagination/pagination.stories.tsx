import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

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
const onPerPageFake = (page: number) => {
  console.log(page)
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
