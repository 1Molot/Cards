import { useState } from 'react'

import { createPortal } from 'react-dom'

import { useAppDispatch, useAppSelector } from '../../app/providers/store-provider/store.ts'
import { Trash } from '../../assets/icons/trash.tsx'
import { deckSlice, useGetDecksQuery, useMeQuery } from '../../featchers'
import { useDebounce, usePackDeckState } from '../../shared/hooks'
import {
  Button,
  Pagination,
  SelectDemo,
  SliderDemo,
  TabSwitcher,
  TextField,
  Typography,
} from '../../shared/ui'

import { DeskTable } from './descks-table.tsx'
import s from './desks-page.module.scss'

export const Decks = () => {
  const initialName = useAppSelector(state => state.deckSlice.searchByName)
  const tabSwitcherOptions = useAppSelector(state => state.deckSlice.tabSwitcherOptions)
  const itemsPerPage = useAppSelector(state => state.deckSlice.itemsPerPage)
  const sliderValues = useAppSelector(state => state.deckSlice.slider)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage)

  const dispatch = useAppDispatch()

  const newInitialName = useDebounce(initialName, 1000)

  const {
    cardId,
    setCardId,
    userId,
    setUserId,
    sort,
    setSort,
    sortedString,
    page,
    setPage,
    setValueSlider,
    valueSlider,
    perPage,
    onSetPerPageHandler,
  } = usePackDeckState(sliderValues, currentPage, itemsPerPage)
  const [activeTab, setActiveTab] = useState(tabSwitcherOptions[1].value)
  const { data: meData } = useMeQuery()
  const { data } = useGetDecksQuery({
    name: newInitialName,
    orderBy: sortedString,
    itemsPerPage: perPage.value,
    authorId: userId,
    minCardsCount: valueSlider[0],
    maxCardsCount: valueSlider[1],
    currentPage: page,
  })
  // const [createDeck] = useCreateDeckMutation()
  // const [deleteDeck] = useDeletedDeckMutation()
  // const [editDeck] = useUpdateDeckMutation()
  const setSearchByName = (event: string) => {
    dispatch(deckSlice.actions.setSearchByName(event))
  }
  const handleTabSort = (value: string) => {
    setActiveTab(value)
    if (value === 'My Cards') {
      setUserId(meData!.id)
    } else {
      setUserId('')
    }
  }

  const clearFilterData = () => {
    setSearchByName('')
    handleTabSort('All cards')
    setActiveTab(tabSwitcherOptions[1].value)
    setValueSlider([sliderValues.minValue, sliderValues.maxValue])
    setSort({ key: 'updated', direction: 'asc' })
  }

  const [isShowModal, setShowModal] = useState(false)

  return (
    <div className={s.packListBlock}>
      {/*все что связанно с  настройками --- мой -- очистить настройки  */}
      <div className={s.headBlock}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant={'primary'} onClick={() => setShowModal(true)}>
          Add New Pack
        </Button>
        {isShowModal && createPortal(<div>Добавить колоду</div>, document.body)}
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
      <DeskTable
        data={data}
        setCardId={setCardId}
        setSort={setSort}
        sort={sort}
        authData={meData}
        // setIsMyPackHandler={}
      />

      {/*все что связанно с пагинацией   */}
      <div className={s.pagination}>
        <Pagination count={data?.pagination.totalPages} page={page} onChange={setPage} />
        <Typography variant={'Body2'}>Показать</Typography>
        <SelectDemo
          options={options}
          defaultValue={perPage.value}
          onValueChange={onSetPerPageHandler}
          className={s.selectPagination}
        />
        <Typography variant={'Body2'}>На странице</Typography>
      </div>
      {/*<AddEditPackModal onSubmit={addOrEditPack} />*/}
      {/*<DeletePackCardModal onSubmit={deletePack} />*/}
    </div>
  )
}
