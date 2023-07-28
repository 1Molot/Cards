import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'H1',
        'H2',
        'H3',
        'Body1',
        'Subtitle1',
        'Body2',
        'Subtitle2',
        'Caption',
        'Overline',
        'Link1',
        'Link2',
      ],
      control: { type: 'radio' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const large: Story = {
  args: {
    variant: 'large',
    children: 'large Typography',
    disabled: false,
  },
}

export const H1: Story = {
  args: {
    variant: 'H1',
    children: 'Secondary Typography',
    disabled: false,
  },
}
export const H2: Story = {
  args: {
    variant: 'H2',
    children: 'H2 Typography',
    disabled: false,
  },
}
export const H3: Story = {
  args: {
    variant: 'H3',
    children: 'H3 Typography',
    disabled: false,
  },
}
export const Body1: Story = {
  args: {
    variant: 'Body1',
    children: 'Body1 Typography',
    disabled: false,
  },
}
export const Subtitle1: Story = {
  args: {
    variant: 'Subtitle1',
    children: 'Subtitle1 Typography',
    disabled: false,
  },
}
export const Body2: Story = {
  args: {
    variant: 'Body2',
    children: 'Body2 Typography',
    disabled: false,
  },
}
export const Subtitle2: Story = {
  args: {
    variant: 'Subtitle2',
    children: 'Subtitle2 Typography',
    disabled: false,
  },
}
export const Caption: Story = {
  args: {
    variant: 'Caption',
    children: 'Caption Typography',
    disabled: false,
  },
}
export const Overline: Story = {
  args: {
    variant: 'Overline',
    children: 'Overline Typography',
    disabled: false,
  },
}
export const Link1: Story = {
  args: {
    variant: 'Link1',
    children: 'Link1 Typography',
    disabled: false,
  },
}
export const Link2: Story = {
  args: {
    variant: 'Link2',
    children: 'Link2 Typography',
    disabled: false,
  },
}

// export const Link: Story = {
//   args: {
//     variant: 'link',
//     children: 'Tertiary Typography',
//     disabled: false,
//   },
// }
//
// export const FullWidth: Story = {
//   args: {
//     variant: 'primary',
//     children: 'Full Width Button',
//     disabled: false,
//     fullWidth: true,
//   },
// }
//
// export const AsLink: Story = {
//   args: {
//     variant: 'primary',
//     children: 'Link that looks like a button',
//     as: 'a',
//   },
// }
