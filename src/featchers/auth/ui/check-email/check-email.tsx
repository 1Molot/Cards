import { Link, useParams } from 'react-router-dom'

import { Email } from '../../../../assets/icons/email.tsx'
import { Button } from '../../../../shared/ui/button'
import { Card } from '../../../../shared/ui/card'
import { Typography } from '../../../../shared/ui/typography'

import s from './check-email.module.scss'

export const CheckEmail = () => {
  const params = useParams<{ email: string }>()

  return (
    <Card className={s.checkEmailWrapper}>
      <Typography className={s.typo} variant={'large'}>
        Check Email
      </Typography>
      <Email className={s.emailIcon} />
      <Typography variant={'Body2'} className={s.instructions}>
        We’ve sent an Email with instructions to {params.email}
      </Typography>
      <Button as={Link} to="/login" fullWidth={true} className={s.back}>
        Back to Sign In
      </Button>
    </Card>
  )
}
