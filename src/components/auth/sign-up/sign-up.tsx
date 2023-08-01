import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledCheckbox, ControlledTextField } from '../../ui/controlled'
import { Typography } from '../../ui/typography'

import s from './sign-up.module.scss'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
  acceptTerms: z.boolean().default(false),
})

type SignUpFormSchema = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = (data: SignUpFormSchema) => {
    console.log(data)
  }

  return (
    <Card className={s.signUpWrapper}>
      <Typography variant={'large'}>Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.field}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'default'}
          control={control}
        />
        <ControlledTextField
          className={s.field}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
          control={control}
        />
        <ControlledTextField
          className={s.field}
          errorMessage={errors.confirmPassword?.message}
          label={'Confirm Password'}
          name={'confirmPassword'}
          type={'password'}
          control={control}
        />
        <ControlledCheckbox
          control={control}
          name={'acceptTerms'}
          variant={'withText'}
          checkBoxText={'I accept the terms and conditions'}
        />

        <Button fullWidth={true} className={s.submit} type="submit">
          Sign Up
        </Button>
      </form>
      <Typography variant={'Body2'}>Already have an account?</Typography>
      <Button as={'a'} variant={'link'} className={s.signIn}>
        Sign Up
      </Button>
    </Card>
  )
}