import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from './base-api-with-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me', 'Cards', 'Admin', 'Auth'],
  baseQuery: customFetchBase,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://api.flashcards.andrii.es/',
  //   credentials: 'include',
  //   prepareHeaders: headers => {
  //     headers.append('x-auth-skip', 'true')
  //   },
  // }),
  endpoints: () => ({}),
})
