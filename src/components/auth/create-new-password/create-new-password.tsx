import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledTextField } from '../../ui/controlled'
import { Typography } from '../../ui/typography'

import s from './create-new-password.module.scss'

const createNewPasswordSchema = z.object({
  password: z.string().min(8).max(20),
})

type CreateNewPasswordFormSchema = z.infer<typeof createNewPasswordSchema>

export const CreateNewPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPasswordFormSchema>({
    resolver: zodResolver(createNewPasswordSchema),
  })

  const onSubmit = (data: CreateNewPasswordFormSchema) => {
    console.log(data)
  }

  return (
    <Card className={s.createNewPasswordWrapper}>
      <Typography variant={'large'} className={s.typo}>
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.field}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
          control={control}
        />
        <Typography variant={'Body2'} className={s.instructions}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
