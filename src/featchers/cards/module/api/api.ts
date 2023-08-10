import { baseApi } from '../../../../shared'
import { CardsResponse, GetCardsArg, PatchCardsArg } from '../type/type.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, GetCardsArg>({
        query: args => {
          return {
            url: `v1/cards/${args.id}`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Cards'],
      }),
      patchCards: builder.mutation<CardsResponse, PatchCardsArg>({
        query: args => {
          return {
            url: `v1/cards/${args.id}`,
            method: 'PATCH',
            params: args,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      deleteCards: builder.mutation<{}, GetCardsArg>({
        query: args => {
          return {
            url: `v1/cards/${args.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useGetCardsQuery, usePatchCardsMutation, useDeleteCardsMutation } = cardsApi
