import { FC } from 'react'

//import { Logo } from '../../../common/assets/img'

import { Logo } from '../../assets/image/logo.tsx'
import { Button } from '../ui/button'
import { Typography } from '../ui/typography'

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
        {/*<DropDownMenuDemo />*/}
      </div>
    )}
  </div>
)
