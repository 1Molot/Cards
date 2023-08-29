import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ControlledTextField } from '../../../../shared/lib'
import { Button, Card, Typography } from '../../../../shared/ui'
import { useForgotPasswordMutation } from '../../module'

import s from './forgot-password.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const navigate = useNavigate()
  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = (data: ForgotPasswordFormSchema) => {
    forgotPassword({
      ...data,
      html: `<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/recover-password/##token##">here</a> to recover your password</p>`,
    })
    navigate(`/check-email/${data.email}`)
  }

  return (
    <Card className={s.forgotPasswordWrapper}>
      <Typography variant={'large'} className={s.typo}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledTextField
          className={s.field}
          placeholder={'enter your email'}
          //errorMessage={errors.email?.message}
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
      <Button as={Link} to="/login" variant={'link'} className={s.tryLog}>
        Try logging in
      </Button>
    </Card>
  )
}
