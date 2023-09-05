import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/providers/store-provider/store.ts'
import { Trash } from '../../assets/icons/trash.tsx'
import {
  AddEditDeckModal,
  cardsSlice,
  deckSlice,
  DeleteDeckCardModal,
  modalActions,
  selectOpen,
  selectPackSettings,
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useGetDecksQuery,
  useMeQuery,
  useUpdateDeckMutation,
} from '../../featchers'
import { useDebounce, useMutationWithToast, usePackDeckState } from '../../shared/hooks'
import {
  Button,
  Pagination,
  SelectDemo,
  SliderDemo,
  TabSwitcher,
  TextField,
  Typography,
} from '../../shared/ui'

import { DecksListTable } from './decks-list-table'
import s from './decks-list.module.scss'

export const DecksList = () => {
  const initialName = useAppSelector(state => state.deckSlice.searchByName)
  const tabSwitcherOptions = useAppSelector(state => state.deckSlice.tabSwitcherOptions)
  const itemsPerPage = useAppSelector(state => state.deckSlice.currentPerPage.packList)
  const sliderValues = useAppSelector(state => state.deckSlice.slider)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage.packList)
  const open = useAppSelector(selectOpen)
  const { privatePack, packName, img } = useAppSelector(selectPackSettings)
  const hookWithToast = useMutationWithToast()
  const [activeTab, setActiveTab] = useState(tabSwitcherOptions[1].value)
  const dispatch = useAppDispatch()

  const {
    cardId,
    setCardId,
    userId,
    setUserId,
    sort,
    setSort,
    sortedString,
    setValueSlider,
    valueSlider,
  } = usePackDeckState(sliderValues)

  const newInitialName = useDebounce(initialName, 1000)

  const { data: meData } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortedString,
    itemsPerPage: itemsPerPage.value,
    authorId: userId,
    minCardsCount: valueSlider[0],
    maxCardsCount: valueSlider[1],
    currentPage,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const setNewCurrentPage = (page: number) => {
    dispatch(deckSlice.actions.setCurrentPage({ value: 'packList', newCurrentPage: page }))
  }
  const setNewPerPage = (value: number) => {
    dispatch(deckSlice.actions.setItemsPerPage({ value: 'packList', newCurrentPage: value }))
  }
  const setSearchByName = (event: string) => {
    dispatch(deckSlice.actions.setSearchByName(event))
  }
  const setIsMyPackHandler = (value: boolean) => {
    dispatch(cardsSlice.actions.setIsMyPack({ isMyPack: value }))
  }
  const handleTabSort = (value: string) => {
    setActiveTab(value)
    if (value === 'My Cards') {
      setUserId(meData!.id)
      dispatch(deckSlice.actions.setCurrentPage({ value: 'packList', newCurrentPage: 1 }))
    } else {
      setUserId('')
    }
  }
  const clearFilterData = () => {
    setSearchByName('')
    handleTabSort('All Cards')
    setActiveTab('All Cards')
    setValueSlider([sliderValues.minValue, sliderValues.maxValue])
    setSort({ key: 'updated', direction: 'asc' })
  }
  const addOrEditDeck = async () => {
    if (open === 'addPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))
      img && formData.append('cover', img)

      await hookWithToast(createDeck(formData), 'Колода успешно добавлена')
    } else if (open === 'editPack') {
      const formData = new FormData()

      formData.append('name', packName)
      formData.append('isPrivate', String(privatePack))
      img && formData.append('cover', img)

      await hookWithToast(editDeck({ id: cardId, formData }), 'Колода успешно обновлена')
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const deleteDeckk = async () => {
    await hookWithToast(deleteDeck({ id: cardId }), 'Колода успешно удалена')

    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const setOpen = () => {
    dispatch(modalActions.setOpenModal('addPack'))
  }

  return (
    <div className={s.packListBlock}>
      {/*все что связанно с  настройками --- мой -- очистить настройки  */}
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'} onClick={setOpen}>
          Add New Pack
        </Button>
      </div>
      <div className={s.settingsBlock}>
        <TextField
          value={initialName}
          type={'searchType'}
          placeholder={'Type to find...'}
          className={s.textField}
          onChangeText={event => setSearchByName(event)}
          onSearchClear={() => setSearchByName('')}
        />
        <div>
          <Typography variant={'Body2'} className={s.titleSettings}>
            Show packs cards
          </Typography>
          <TabSwitcher
            onChangeCallback={value => handleTabSort(value)}
            options={tabSwitcherOptions}
            className={s.switcher}
            activeTab={activeTab}
          />
        </div>
        <div>
          <Typography variant={'Body2'} className={s.titleSettings}>
            Number of cards
          </Typography>
          <SliderDemo
            value={valueSlider}
            setValue={setValueSlider}
            maxValue={data?.maxCardsCount}
          />
        </div>
        <Button variant={'secondary'} onClick={clearFilterData}>
          <Trash />
          Clear Filter
        </Button>
      </div>

      {/*все что связанно с  таблицей   */}
      <DecksListTable
        data={data}
        setCardId={setCardId}
        setSort={setSort}
        sort={sort}
        authData={meData}
        setIsMyPackHandler={setIsMyPackHandler}
      />

      {/*все что связанно с пагинацией   */}
      <div className={s.pagination}>
        <Pagination
          count={data?.pagination.totalPages}
          page={currentPage}
          onChange={setNewCurrentPage}
        />
        <Typography variant={'Body2'}>Показать</Typography>
        <SelectDemo
          options={options}
          defaultValue={itemsPerPage.value}
          onValueChange={setNewPerPage}
          className={s.selectPagination}
        />
        <Typography variant={'Body2'}>На странице</Typography>
      </div>
      <AddEditDeckModal onSubmit={addOrEditDeck} />
      <DeleteDeckCardModal onSubmit={deleteDeckk} />
    </div>
  )
}
