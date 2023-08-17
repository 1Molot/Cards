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
} from '../type'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<AuthResponse, void>({
        query: () => {
          return {
            url: `v1/auth/me`,
            method: 'GET',
          }
        },
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
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
      login: builder.mutation<LoginResponse, LoginAuthArgs>({
        query: args => {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Me'],
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
      logout: builder.mutation({
        query: () => {
          return {
            url: `v1/auth/logout`,
            method: 'POST',
          }
        },
        //   invalidatesTags: ['Auth'],
        // }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            //@ts-ignore
            authApi.util.updateQueryData('me', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Me'],
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
  useMeQuery,
  useUpdateAuthMutation,
  useLoginMutation,
  useSignUpAuthMutation,
  useVerifyAuthMutation,
  useResendVerificationEmailAuthMutation,
  useLogoutMutation,
  useRefreshTokenAuthMutation,
  useRecoveryPasswordAuthMutation,
  useResetPasswordAuthMutation,
} = authApi
