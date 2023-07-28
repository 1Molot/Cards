import { FC } from 'react'

import s from './card.module.scss'

export type CardProps = {
  children: React.ReactNode
}
export const Card: FC<CardProps> = ({ children }) => {
  return <div className={s.cardWrapper}>{children}</div>
}
