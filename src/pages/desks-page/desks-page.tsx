import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../app/providers/store-provider/store.ts'
import {
  CreateDeckArgs,
  decksSlice,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useLogoutMutation,
} from '../../featchers'
import {
  //BaseTable,
  Button,
  ControlledTextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../shared'

export const Decks = () => {
  // const [cardName, setCardName] = useState('')

  const { register, control, handleSubmit } = useForm<{
    name: string
    cover: File[]
  }>()

  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const orderBy = useAppSelector(state => state.decksSlice.orderBy)

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  }
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const {
    isLoading,
    currentData: data,
    refetch,
  } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy,
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()
  const [
    deleteDeck,
    {
      /*error*/
    },
  ] = useDeleteDeckMutation()
  const [logout] = useLogoutMutation()

  const handleCreateClicked = handleSubmit(data => {
    const formData = new FormData()

    console.log(data.cover)
    formData.append('name', data.name)
    formData.append('cover', data.cover[0])

    createDeck(formData as unknown as CreateDeckArgs)
  })

  // const handleCreateClicked = () => createDeck({ name: cardName })
  //
  // const headerRows = [
  //   { title: 'Name', id: 1 },
  //   { title: 'Cards Count', id: 2 },
  //   { title: 'Date', id: 3 },
  //   { title: 'Author Name', id: 4 },
  // ]

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <form onSubmit={handleCreateClicked}>
        <ControlledTextField name={'name'} control={control} label={'name'} />
        <input type={'file'} {...register('cover')} />
        <Button>Create deck</Button>
      </form>
      isCreateDeckLoading: {isCreateDeckLoading.toString()}
      <Table>
        {/* table*/}
        <TableHead>
          {/* thead*/}
          <TableRow>
            {/* tr*/}
            <TableHeadCell>Name</TableHeadCell>
            {/* th*/}
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Created By</TableHeadCell>
          </TableRow>
        </TableHead>
        {/*<BaseTable headerItems={headerRows}>*/}
        <TableBody>
          {data?.items.map(item => {
            return (
              <TableRow key={item.id}>
                {/* tr*/}
                <TableCell>{item.name}</TableCell> {/* td*/}
                <TableCell>{item.cardsCount}</TableCell>
                <TableCell>{new Date(item.updated).toLocaleString('en-GB')}</TableCell>
                <TableCell>{item.author.name}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteDeck({ id: item.id })}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        {/*</BaseTable>*/}
      </Table>
    </div>
  )
}
