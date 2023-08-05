import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Ava } from '../../../assets/icons/ava'
import { Logout } from '../../../assets/icons/logout.tsx'
import { Profile } from '../../../assets/icons/profile.tsx'
import { Typography } from '../typography'

import s from './drop-down.module.scss'

type DropDownPropsType = {
  trigger?: ReactNode
}

export const DropDown: FC<DropDownPropsType> = () => {
  return (
    <DropdownMenu.Root>
      <div className={s.dropDownBlock}>
        <DropdownMenu.Trigger asChild>
          <button className={s.iconButton} aria-label="Customise options">
            <Ava />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.dropDownContent} sideOffset={5}>
            <DropdownMenu.Item className={s.dropDownItem}>
              <div className={s.dropdownItemInfo}>
                <Ava />
                <div className={s.info}>
                  <Typography variant={'Subtitle2'}>Name</Typography>
                  <Typography variant={'Caption'} className={s.email}>
                    egor.belozerov@mail.ru
                  </Typography>
                </div>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropDownSeparator} />
            <DropdownMenu.Item className={s.dropdownItem}>
              <div className={s.dropDownItemContent}>
                <Profile />
                <Typography variant={'Caption'}>My Profile</Typography>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={s.dropDownSeparator} />
            <DropdownMenu.Item className={s.dropDownItem}>
              <div className={s.dropDownItemContent}>
                <Logout />
                <Typography variant={'Caption'}>Sign out</Typography>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className={s.arrowBox} asChild>
              <div className={s.arrow} />
            </DropdownMenu.Arrow>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  )
}
