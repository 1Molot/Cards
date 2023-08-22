import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../../../shared'
import { useSignUpMutation } from '../../module'

import s from './sign-up.module.scss'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3).max(10),
    confirmPassword: z.string().min(3).max(10),
    //acceptTerms: z.boolean().default(false),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

type SignUpFormSchema = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const [signUp] = useSignUpMutation()

  const onSubmit = (data: SignUpFormSchema) => {
    signUp({ email: data.email, password: data.password, sendConfirmationEmail: false })
      .unwrap()
      .then(() => {
        navigate(`/check-email/${data.email}`)
      })
    // .catch(err => {
    //   toast.error(err.data.message)
    // })
  }

  return (
    <Card className={s.signUpWrapper}>
      <Typography variant={'large'} className={s.typo}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledTextField
          className={s.field}
          //errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'default'}
          control={control}
          placeholder={'enter your email'}
        />
        <ControlledTextField
          className={s.field}
          // errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
          control={control}
          placeholder={'enter your password'}
        />
        <ControlledTextField
          className={`${s.field} ${s.fieldBottom}`}
          //errorMessage={errors.confirmPassword?.message}
          label={'Confirm Password'}
          name={'confirmPassword'}
          type={'password'}
          control={control}
          placeholder={'enter your password'}
        />
        <Button fullWidth={true} className={s.submit} type="submit">
          Sign Up
        </Button>
      </form>
      <Typography variant={'Body2'} className={s.typo}>
        Already have an account?
      </Typography>
      <Button as={Link} to="/login" variant={'link'} className={s.signUp}>
        Sign In
      </Button>
    </Card>
  )
}
