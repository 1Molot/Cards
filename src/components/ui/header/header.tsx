import { FC } from 'react'

import { Logo } from '../../../assets/icons/logo.tsx'
import { Button } from '../button'
import { DropDown } from '../drop-down'
import { Typography } from '../typography'

import s from './header.module.scss'

type HeaderProps = {
  isAuth: boolean
}
export const Header: FC<HeaderProps> = ({ isAuth }) => (
  <div className={s.headerBlock}>
    <Logo />
    {!isAuth && <Button variant={'primary'}>Sign In</Button>}
    {isAuth && (
      <div className={s.avatar_menu}>
        <Typography variant={'Subtitle1'} className={s.menu_name}>
          Name
        </Typography>
        <DropDown />
      </div>
    )}
  </div>
)
