import { RootState } from '../../../../app/providers/store-provider/store.ts'
import { baseApi, PaginatedEntity } from '../../../../shared'
import {
  CreateDeckArgs,
  Deck,
  DeckIdArgs,
  DecksResponse,
  DeleteDeckArgs,
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
      // createDeck: builder.mutation<Deck, CreateDeckArgs>({
      //   query: data => {
      //     return {
      //       url: 'v1/decks',
      //       method: 'POST',
      //       //body: { name },
      //       body: data,
      //     }
      //   },
      //   invalidatesTags: ['Decks'],
      // }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: data => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: data,
          }
        },
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState

          const { searchByName, orderBy, currentPage, itemsPerPage } = state.decksSlice

          try {
            const res = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                { name: searchByName, orderBy, currentPage, itemsPerPage },
                draft => {
                  draft.items.pop()
                  draft.items.unshift(res.data)
                }
              )
            )
          } catch {
            // patchResult.undo()
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
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
      // deleteDecks: builder.mutation<DeleteDecksResponse, DeckIdArgs>({
      //   query: args => {
      //     return {
      //       url: `v1/decks/${args.id}`,
      //       method: 'DELETE',
      //     }
      //   },
      //   invalidatesTags: ['Decks'],
      // }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState

          const { searchByName, orderBy, currentPage, itemsPerPage } = state.decksSlice

          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              { name: searchByName, orderBy, currentPage, itemsPerPage },
              draft => {
                draft.items = draft.items.filter(deck => deck.id !== id)
              }
            )
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
  useDeleteDeckMutation,
  useLazyRetrieveDecksCardsQuery,
  useCreateDecksCardsMutation,
  useRetrieveDecksLearnQuery,
  useSaveDecksLearnMutation,
} = decksApi
