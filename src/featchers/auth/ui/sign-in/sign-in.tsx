import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import {
  Button,
  Card,
  ControlledCheckbox,
  ControlledTextField,
  Typography,
} from '../../../../shared'

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
    <>
      <Card className={s.card}>
        <Typography variant="large" className={s.title}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmitForm}>
          <div className={s.form}>
            <ControlledTextField
              placeholder={'enter your email'}
              label={'Email'}
              name={'email'}
              control={control}
              type={'default'}
            />
            <ControlledTextField
              placeholder={'enter your password'}
              label={'Password'}
              type={'password'}
              name={'password'}
              control={control}
              autoComplete={'on'}
            />
          </div>
          <ControlledCheckbox
            className={s.checkbox}
            label={'Remember me'}
            control={control}
            name={'rememberMe'}
            position={'left'}
          />
          <Button
            as={Link}
            to="/forgot-password"
            variant={'link'}
            className={s.recoverPasswordLink}
          >
            <Typography variant={'Body2'}>Forgot Password?</Typography>
          </Button>

          <Button fullWidth={true} className={s.button} type="submit">
            Sign In
          </Button>
        </form>
        <Typography variant={'Body2'} className={s.caption}>
          {`Don't have an account?`}
        </Typography>
        <Button as={Link} to="/sign-up" variant={'link'} className={s.signUpLink}>
          Sign Up
        </Button>
      </Card>
    </>
  )
}
