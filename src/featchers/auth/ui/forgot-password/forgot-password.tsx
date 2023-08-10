import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card } from '../../../../shared'
import { ControlledTextField } from '../../../../shared/lib/controlled'
import { Typography } from '../../../../shared/lib/typography'

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
        Forgot your password?
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
        <Typography variant={'Body2'} className={s.instructions}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          Send instructions
        </Button>
      </form>
      <Typography variant={'Body2'} className={s.didYou}>
        Did you remember your password?
      </Typography>
      <Button as={'a'} variant={'link'} className={s.tryLog}>
        Try logging in
      </Button>
    </Card>
  )
}
