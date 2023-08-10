import { baseApi } from '../../../../shared'
import {
  AuthResponse,
  LoginAuthArgs,
  LoginResponse,
  PatchAuthArgs,
  RecoveryPasswordAuthArg,
  ResendVerificationEmailAuthArgs,
  ResetPasswordAuthArg,
  SignUpAuthArgs,
  VerifyAuthArgs,
} from '../type/type.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      currentAuth: builder.query<AuthResponse, {}>({
        query: () => {
          return {
            url: `v1/auth/me`,
            method: 'GET',
          }
        },
        providesTags: ['Auth'],
      }),
      updateAuth: builder.mutation<AuthResponse, PatchAuthArgs>({
        query: args => {
          return {
            url: `v1/auth/me`,
            method: 'PATCH',
            params: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      loginAuth: builder.mutation<LoginResponse, LoginAuthArgs>({
        query: args => {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      signUpAuth: builder.mutation<AuthResponse, SignUpAuthArgs>({
        query: args => {
          return {
            url: `v1/auth/sign-up`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      verifyAuth: builder.mutation<{}, VerifyAuthArgs>({
        query: args => {
          return {
            url: `v1/auth/verify-email`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      resendVerificationEmailAuth: builder.mutation<{}, ResendVerificationEmailAuthArgs>({
        query: args => {
          return {
            url: `v1/auth/resend-verification-email`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      logoutAuth: builder.mutation<{}, {}>({
        query: args => {
          return {
            url: `v1/auth/logout`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      refreshTokenAuth: builder.mutation<{}, {}>({
        query: args => {
          return {
            url: `v1/auth/refresh-token`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      recoveryPasswordAuth: builder.mutation<{}, RecoveryPasswordAuthArg>({
        query: args => {
          return {
            url: `v1/auth/recovery-password`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
      resetPasswordAuth: builder.mutation<{}, ResetPasswordAuthArg>({
        query: args => {
          return {
            url: `v1/auth/reset-password/${args.token}`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Auth'],
      }),
    }
  },
})

export const {
  useCurrentAuthQuery,
  useUpdateAuthMutation,
  useLoginAuthMutation,
  useSignUpAuthMutation,
  useVerifyAuthMutation,
  useResendVerificationEmailAuthMutation,
  useLogoutAuthMutation,
  useRefreshTokenAuthMutation,
  useRecoveryPasswordAuthMutation,
  useResetPasswordAuthMutation,
} = authApi
