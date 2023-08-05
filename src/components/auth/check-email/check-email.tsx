import { FC } from 'react'

import { Email } from '../../../assets/icons/email.tsx'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Typography } from '../../ui/typography'

import s from './check-email.module.scss'

type CheckEmailType = {
  email: string
}
export const CheckEmail: FC<CheckEmailType> = ({ email }) => {
  return (
    <Card className={s.checkEmailWrapper}>
      <Typography className={s.typo} variant={'large'}>
        Check Email
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant={'Body2'} className={s.instructions}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button type="submit" fullWidth={true} className={s.back}>
        Back to Sign In
      </Button>
    </Card>
  )
}
