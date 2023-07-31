// import { DevTool } from '@hookform/devtools'
// import { useController, useForm } from 'react-hook-form'
// import { z } from 'zod'
//
// //import { TextField, Button, Checkbox } from '@/components'
//
// type FormValues = {
//   email: string
//   password: string
//   rememberMe: boolean

// }
// const emailRegex =
//   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
//
// const MIN_PASSWORD_LENGTH = 3
//
// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(MIN_PASSWORD_LENGTH),
//   remembreMe: z.boolean().default(false),
// })
//
// export const LoginForm = () => {
//   const { register, handleSubmit, control } = useForm<FormValues>({
//     resolver: zedResolve(loginSchema),
//   })
//
//   const {
//     field: { value, onChange },
//     formState: { errors },
//   } = useController({
//     name: 'rememberMe',
//     control,
//     defaultValue: false,
//   })
//
//   console.log(errors)
//
//   const onSubmit = (data: FormValues) => {
//     console.log(data)
//   }
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <DevTool control={control} />
//       <TextField
//         {...register('email', {
//           required: 'Email is required',
//           pattern: { value: emailRegex, message: 'Invalid email' },
//         })}
//         label={'email'}
//       />
//       <TextField
//         {...register('password', {
//           required: 'Password is required',
//           minLength: {
//             value: MIN_PASSWORD_LENGTH,
//             message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
//           },
//         })}
//         label={'password'}
//       />
//       <Checkbox checked={value} onValueChange={onChange} label={'remember me'} />
//       <Button option="primer" type="submit">Submit</Button>
//     </form>
//   )
// }
