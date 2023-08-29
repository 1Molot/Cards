import { FC } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Logo } from '../../../assets/icons/logo.tsx'
import { Logout } from '../../../assets/icons/logout.tsx'
import { Profile } from '../../../assets/icons/profile.tsx'
import { ResponseUserType, useLogoutMutation } from '../../../featchers'
import { AvatarDemo } from '../avatar'
import { Button } from '../button'
import { DropDown } from '../drop-down'
import { Typography } from '../typography'

import s from './header.module.scss'
import { ProfileBlock } from './profile-block'

type HeaderProps = {
  data?: ResponseUserType | null
}
export const Header: FC<HeaderProps> = ({ data }) => {
  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => toast.success('Всего хорошего'))
      .catch(() => toast.error('Что-то пошло не так'))
  }

  const dropDownMenu = [
    { id: 1, component: <ProfileBlock data={data} /> },
    {
      id: 2,
      component: (
        <Button as={Link} to={'/profile'} variant={'link'} className={s.buttonDrop}>
          <Profile />
          <Typography variant={'Caption'}>My Profile</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={logoutHandler}>
          <Logout />
          <Typography variant={'Caption'}>Sign Out</Typography>
        </Button>
      ),
    },
  ]

  return (
    <div className={s.headerBlock}>
      <div className={s.contentHeader}>
        <Button as={Link} to="/" variant={'link'} className={s.logo}>
          <Logo />
        </Button>
        {!data && <Button variant={'primary'}>Sign In</Button>}
        {data && (
          <div className={s.avatar_menu}>
            <Typography variant={'Subtitle1'} className={s.menu_name}>
              {data.name}
            </Typography>
            <DropDown
              items={dropDownMenu}
              trigger={<AvatarDemo src={data.avatar} name={data.name} />}
            />
          </div>
        )}
      </div>
    </div>
  )
}
