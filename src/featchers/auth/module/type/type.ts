export type AuthResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type PatchAuthArgs = {
  avatar: string
  email: string
  name: string
}
export type LoginResponse = {
  accessToken: string
}
export type LoginAuthArgs = {
  password: string
  email: string
  rememberMe: boolean
}

export type SignUpAuthArgs = {
  html: string
  name: string
  password: string
  email: string
  subject: string
  sendConfirmationEmail: boolean
}

export type VerifyAuthArgs = {
  code: string
}
export type ResendVerificationEmailAuthArgs = {
  userId: string
}
export type RecoveryPasswordAuthArg = {
  html: string
  email: string
  subject: string
}
export type ResetPasswordAuthArg = {
  password: string
  token: string
}
