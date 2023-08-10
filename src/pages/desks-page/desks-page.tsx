import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/providers/store-provider/store.ts'
import { decksSlice, useCreateDeckMutation, useGetDecksQuery } from '../../featchers/desks'
import { Button } from '../../shared/lib/button'
import { TableCell, TableRow } from '../../shared/lib/table'
import { TextField } from '../../shared/lib/text-field'
import { BaseTable } from '../../shared/ui/base-modal'

export const Decks = () => {
  const [cardName, setCardName] = useState('')

  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const { isLoading, data, refetch } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  const handleCreateClicked = () => createDeck({ name: cardName })

  const headerRows = [
    { title: 'Name', id: 1 },
    { title: 'Cards Count', id: 2 },
    { title: 'Date', id: 3 },
    { title: 'Author Name', id: 4 },
  ]

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div>
        <Button onClick={refetch}>refetch</Button>
      </div>
      <div>
        <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>
        <Button onClick={() => setItemsPerPage(20)}>itemsPerPage: 20</Button>
        <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>
      </div>
      <div>
        <Button onClick={() => setCurrentPage(1)}>currentPage: 1</Button>
        <Button onClick={() => setCurrentPage(2)}>currentPage: 2</Button>
        <Button onClick={() => setCurrentPage(3)}>currentPage: 3</Button>
      </div>
      {/*  фильтрация по имени(инпут техфильд)*/}
      <TextField value={searchByName} onChange={e => setSearch(e.currentTarget.value)} />
      <TextField
        value={cardName}
        onChange={e => setCardName(e.currentTarget.value)}
        label={'card name'}
      />
      <Button onClick={handleCreateClicked}>Create deck</Button>
      isCreateDeckLoading: {isCreateDeckLoading.toString()}
      <BaseTable headerItems={headerRows}>
        {data?.items.map(item => {
          return (
            <TableRow key={item.id}>
              {/* tr*/}
              <TableCell>{item.name}</TableCell> {/* td*/}
              <TableCell>{item.cardsCount}</TableCell>
              <TableCell>{new Date(item.updated).toLocaleString('en-GB')}</TableCell>
              <TableCell>{item.author.name}</TableCell>
            </TableRow>
          )
        })}
      </BaseTable>
    </div>
  )
}
