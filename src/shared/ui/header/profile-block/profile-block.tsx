import { FC } from 'react'

import { ResponseUserType } from '../../../../featchers'
import { AvatarDemo } from '../../avatar'
import { Typography } from '../../typography'

import s from './profile-block.module.scss'

type PropsType = {
  data?: ResponseUserType | null
}
export const ProfileBlock: FC<PropsType> = ({ data }) => {
  return (
    <div className={s.infoBlock}>
      <AvatarDemo src={data?.avatar} name={data?.name} />
      <div className={s.info}>
        <Typography variant={'Subtitle2'}>{data?.name}</Typography>
        <Typography variant={'Caption'} className={s.email}>
          {data?.email}
        </Typography>
      </div>
    </div>
  )
}
