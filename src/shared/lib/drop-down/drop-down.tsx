import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

import { Ava } from '../../../assets/icons/ava.tsx'
import { Logout } from '../../../assets/icons/logout.tsx'
import { Profile } from '../../../assets/icons/profile.tsx'
import { Button } from '../button'
import { Typography } from '../typography'

import s from './drop-down.module.scss'

type DropDownMenuPropsType = {
  trigger?: ReactNode
  items?: {
    id: number
    component: JSX.Element
  }[]
}
const dropDownMenu = [
  {
    id: 1,
    component: (
      <Button variant={'link'} className={s.buttonDrop}>
        <Profile />
        <Typography variant={'Caption'}>My Profile</Typography>
      </Button>
    ),
  },
  {
    id: 2,
    component: (
      <Button variant={'link'} className={s.buttonDrop}>
        <Logout />
        <Typography variant={'Caption'}>Sign Out</Typography>
      </Button>
    ),
  },
]
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.1,
    },
  },
}
const motionItem = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const DropDown: FC<DropDownMenuPropsType> = ({
  items = dropDownMenu,
  trigger = <Ava />,
}) => {
  const itemsForRender = items?.map((item, index) => {
    return (
      <div key={index}>
        {index === items?.length - 1 ? (
          <motion.div variants={motionItem}>
            <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
          </motion.div>
        ) : (
          <>
            <motion.div variants={motionItem}>
              <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
              <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
            </motion.div>
          </>
        )}
      </div>
    )
  })

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.iconButton} aria-label="Customise options">
          {trigger}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.dropdownMenuContent} sideOffset={5}>
          <motion.div variants={container} initial="hidden" animate="visible">
            {itemsForRender}
          </motion.div>
          <DropdownMenu.Arrow className={s.arrowBox} asChild>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
