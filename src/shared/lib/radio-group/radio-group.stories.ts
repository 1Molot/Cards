import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './radio-group.tsx'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'Components/RadioGroup',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const RadioGroups: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    value: 'option1',
    disabled: false,
    onChange: () => {},
  },
}
