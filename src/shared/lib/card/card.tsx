import { FC } from 'react'

import s from './card.module.scss'

export type CardProps = {
  children: React.ReactNode
  className?: string
}
export const Card: FC<CardProps> = ({ children, className }) => (
  <div className={`${s.cardWrapper} ${className}`}>{children}</div>
)
