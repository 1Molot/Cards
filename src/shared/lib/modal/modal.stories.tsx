import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './modal.tsx'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  // argTypes: { onChangeOption: { action: 'select changes' } },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalStory: Story = {
  args: {
    open: false,
    title: 'test',
    onClose: () => {},
    children: <>123</>,
    showCloseButton: true,
  },
}
