import { useEffect } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignIn, useLoginMutation, useMeQuery } from '../../featchers'

export const Login = () => {
  const [login] = useLoginMutation()
  const { data, isUninitialized } = useMeQuery()
  const navigate = useNavigate()

  const loginHandler = (data: any) => {
    login(data)
      .unwrap()
      .then(() => {
        toast.success('Успешный вход')
        navigate('/')
      })
      .catch((error: any) => {
        toast.error(error.data.message)
      })
  }

  useEffect(() => {
    if (!data) return
    navigate('/')
  }, [data])

  if (isUninitialized) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <SignIn onSubmit={loginHandler} />
    </>
  )
}
