import { baseApi } from '../../../../shared/api'
import {
  DeleteAdminByIdResponse,
  GetAdminArg,
  PostAdminArg,
  PostAdminResponse,
} from '../type/type.ts'

const adminApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAdmin: builder.query<{}, GetAdminArg>({
        query: () => {
          return {
            url: `v1/users`,
            method: 'GET',
          }
        },
        providesTags: ['Admin'],
      }),
      postAdmin: builder.mutation<PostAdminResponse, PostAdminArg>({
        query: args => {
          return {
            url: `v1/users`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Admin'],
      }),
      deleteAdmin: builder.mutation<{}, {}>({
        query: () => {
          return {
            url: `v1/users`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Admin'],
      }),
      deleteAdminById: builder.mutation<boolean, DeleteAdminByIdResponse>({
        query: args => {
          return {
            url: `v1/users/${args.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Admin'],
      }),
    }
  },
})

export const {
  useGetAdminQuery,
  usePostAdminMutation,
  useDeleteAdminMutation,
  useDeleteAdminByIdMutation,
} = adminApi
