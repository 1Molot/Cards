import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { ControlledCheckbox, ControlledTextField } from '../../../../shared/lib'
import { Button, Card, Typography } from '../../../../shared/ui'

import s from './sign-in.module.scss'

const sigInSchema = z.object({
  password: z.string().nonempty('Enter password').min(3).max(10),
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  rememberMe: z.boolean().optional().default(false),
})

type SignInFormShem = z.infer<typeof sigInSchema>

type PropsType = {
  // onSubmit: (data: FormType) => void
  // isSubmitting?: boolean
  onSubmit: (data: SignInFormShem) => void
}

export const SignIn: FC<PropsType> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(sigInSchema),
  })
  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <ControlledTextField
          name={'email'}
          label={'Email'}
          type={'default'}
          placeholder={'enter your email'}
          control={control}
          className={s.email}
        />
        <ControlledTextField
          name={'password'}
          label={'Password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.password}
          autoComplete={'on'}
        />
        <ControlledCheckbox
          control={control}
          name={'rememberMe'}
          variant={'withText'}
          checkBoxText={'Remember me'}
        />
        <div className={s.forgotWrapper}>
          <Button as={Link} to="/forgot-password" variant={'link'} className={s.forgotPassword}>
            <Typography variant={'Body2'}>Forgot Password?</Typography>
          </Button>
        </div>
        <Button fullWidth={true} className={s.submit} type="submit">
          Sign In
        </Button>
      </form>
      <Typography variant={'Body2'} className={s.question}>
        Don&apos;t have an account?
      </Typography>
      <Button as={Link} to="/sign-up" variant={'link'} className={s.signUp}>
        Sign Up
      </Button>
    </Card>
  )
}
