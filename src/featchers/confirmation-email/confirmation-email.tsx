import { useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import { OkEmail } from '../../assets/icons/ok-email.tsx'
import { Button, Card, Typography } from '../../shared/ui'
import { useVerificationEmailMutation } from '../auth'

import s from './confirmation-email.module.scss'

export const ConfirmationEmail = () => {
  const params = useParams<{ code: string }>()
  const [sendToken] = useVerificationEmailMutation()

  useEffect(() => {
    sendToken({ code: params.code })
  }, [])

  return (
    <Card className={s.emailBlock}>
      <Typography className={s.title} variant={'large'}>
        Email confirmed
      </Typography>
      <OkEmail className={s.emailIcon} />
      <Button as={Link} to="/login" fullWidth={true} className={s.backToSignIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
