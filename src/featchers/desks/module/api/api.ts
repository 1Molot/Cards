import { baseApi, PaginatedEntity } from '../../../../shared'
import {
  CreateDeckArgs,
  Deck,
  DeckIdArgs,
  DecksResponse,
  DeleteDecksResponse,
  GetDecksArgs,
  SaveDecksLearnResponse,
} from '../type'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: ({ name }) => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getDecksById: builder.query<Deck, DeckIdArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.id}`,
            method: 'GET',
          }
        },
        providesTags: ['Decks'],
      }),
      updateDecks: builder.mutation<Deck, DeckIdArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.id}`,
            method: 'PATCH',
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDecks: builder.mutation<DeleteDecksResponse, DeckIdArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Decks'],
      }),
      retrieveDecksCards: builder.query<PaginatedEntity<Deck>, DeckIdArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.id}/cards`,
            method: 'GET',
          }
        },
        providesTags: ['Decks'],
      }),
      createDecksCards: builder.mutation<Deck, DeckIdArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.id}/cards`,
            method: 'POST',
          }
        },
        invalidatesTags: ['Decks'],
      }),
      retrieveDecksLearn: builder.query<Deck, DeckIdArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.id}/learn`,
            method: 'GET',
          }
        },
        providesTags: ['Decks'],
      }),
      saveDecksLearn: builder.mutation<SaveDecksLearnResponse, DeckIdArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.id}/learn`,
            method: 'POST',
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useGetDecksByIdQuery,
  useUpdateDecksMutation,
  useDeleteDecksMutation,
  useLazyRetrieveDecksCardsQuery,
  useCreateDecksCardsMutation,
  useRetrieveDecksLearnQuery,
  useSaveDecksLearnMutation,
} = decksApi
