import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import { ControlledTextField } from '../../../../shared/lib'
import { Button, Card, Typography } from '../../../../shared/ui'
import { useResetPasswordMutation } from '../../module'

import s from './create-new-password.module.scss'

const createNewPasswordSchema = z.object({
  password: z.string().min(3).max(10),
})

type CreateNewPasswordFormSchema = z.infer<typeof createNewPasswordSchema>

export const CreateNewPassword = () => {
  const params = useParams<{ token: string }>()
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<CreateNewPasswordFormSchema>({
    resolver: zodResolver(createNewPasswordSchema),
  })

  const [setNewPassword] = useResetPasswordMutation()
  const onSubmit = (data: CreateNewPasswordFormSchema) => {
    setNewPassword({ password: data.password, token: params.token })
    navigate('/login')
  }

  return (
    <Card className={s.createNewPasswordWrapper}>
      <Typography variant={'large'} className={s.typo}>
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledTextField
          className={s.field}
          //errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
          control={control}
          placeholder={'enter your password'}
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
