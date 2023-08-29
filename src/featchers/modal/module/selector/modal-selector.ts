import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../../app/providers/store-provider/store.ts'

const selectModalSlice = (state: RootState) => state.modalSlice

export const selectOpen = createSelector([selectModalSlice], modalSlice => modalSlice.open)
export const selectPackSettings = createSelector([selectModalSlice], modalSlice => modalSlice.pack)
export const selectCardSettings = createSelector([selectModalSlice], modalSlice => modalSlice.card)
