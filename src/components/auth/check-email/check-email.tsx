import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Email } from '../../../assets/icons/email.tsx'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Typography } from '../../ui/typography'

import s from './check-email.module.scss'

type PropsType = {
  email: string
}
export const CheckEmail: FC<PropsType> = ({ email }) => {
  return (
    <Card className={s.checkEmailWrapper}>
      <Typography className={s.typo} variant={'large'}>
        Check Email
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant={'Body2'} className={s.instructions}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button as={Link} to="/sign-in" fullWidth={true} className={s.back}>
        Back to Sign In
      </Button>
    </Card>
  )
}
