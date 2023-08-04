import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledTextField } from '../../ui/controlled'
import { Typography } from '../../ui/typography'

import s from './forgot-password.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const onSubmit = (data: ForgotPasswordFormSchema) => {
    console.log(data)
  }

  return (
    <Card className={s.forgotPasswordWrapper}>
      <Typography variant={'large'} className={s.typo}>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.field}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'default'}
          control={control}
        />
        <Button fullWidth={true} className={s.submit} type="submit">
          Reset Password
        </Button>
      </form>
      <Typography variant={'Body2'} className={s.typo}>
        Remember your password?
      </Typography>
      <Button as={'a'} variant={'link'} className={s.signIn}>
        Sign In
      </Button>
    </Card>
  )
}
