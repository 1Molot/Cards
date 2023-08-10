import { Routes, Route } from 'react-router-dom'

import { CheckEmail } from '../check-email'
import { CreateNewPassword } from '../create-new-password'
import { ForgotPassword } from '../forgot-password'
import { SignIn } from '../sign-in'
import { SignUp } from '../sign-up'

export const RouterAuth = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/checkemail" element={<CheckEmail email={'example@gmail.com'} />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/createnewpassword" element={<CreateNewPassword />} />
    </Routes>
  )
}
