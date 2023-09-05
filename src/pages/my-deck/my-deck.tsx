import { useMemo, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/providers/store-provider/store.ts'
import { Back } from '../../assets/icons/back.tsx'
import { Edit } from '../../assets/icons/edit.tsx'
import { Play } from '../../assets/icons/play.tsx'
import { SubMenu } from '../../assets/icons/sub-menu.tsx'
import { Trash } from '../../assets/icons/trash.tsx'
import {
  AddEditCardModal,
  AddEditDeckModal,
  deckSlice,
  DeleteDeckCardModal,
  modalActions,
  NameModal,
  selectCardSettings,
  selectOpen,
  selectPackSettings,
  useCreateCardMutation,
  useDeleteCardMutation,
  useDeletedDeckMutation,
  useEditCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '../../featchers'
import { useMutationWithToast } from '../../shared/hooks'
import { Loader } from '../../shared/lib'
import {
  Button,
  DropDown,
  Pagination,
  SelectDemo,
  Sort,
  TextField,
  Typography,
} from '../../shared/ui'

import { MyDeckTable } from './my-deck-table'
import s from './my-deck.module.scss'

export const MyDeck = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { privatePack, packName, img } = useAppSelector(selectPackSettings)
  const { question, answer, questionImg, answerImg } = useAppSelector(selectCardSettings)
  const itemsPerPage = useAppSelector(state => state.deckSlice.currentPerPage.myPack)
  const options = useAppSelector(state => state.deckSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.deckSlice.currentPage.myPack)
  const open = useAppSelector(selectOpen)
  const hookWithToast = useMutationWithToast()
  const dispatch = useAppDispatch()

  const [cardId, setCardId] = useState<string>('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data } = useGetDeckQuery({
    id: params.id,
  })
  const { data: dataCards, isLoading } = useGetCardsQuery({
    id: params.id,
    question: search,
    orderBy: sortedString,
    itemsPerPage: itemsPerPage.value,
    currentPage: currentPage,
  })
  const [createCard] = useCreateCardMutation()
  const [editItem] = useEditCardMutation()
  const [deleteItem] = useDeleteCardMutation()
  const [deleteDeck] = useDeletedDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const openPackModal = (value: NameModal) => {
    dispatch(modalActions.setOpenModal(value))
    dispatch(modalActions.setPackName(data!.name))
    dispatch(modalActions.setPrivatePack(data!.isPrivate))
    setCardId(data!.id)
  }
  const setNewCurrentPage = (page: number) => {
    dispatch(deckSlice.actions.setCurrentPage({ value: 'myPack', newCurrentPage: page }))
  }
  const setNewPerPage = (value: number) => {
    dispatch(deckSlice.actions.setItemsPerPage({ value: 'myPack', newCurrentPage: value }))
  }
  const addCardModalHandler = () => {
    dispatch(modalActions.setOpenModal('addCard'))
  }
  const addOrEditCard = async () => {
    if (open === 'addCard') {
      const formData = new FormData()

      formData.append('question', question)
      formData.append('answer', answer)
      questionImg && formData.append('questionImg', questionImg)
      answerImg && formData.append('answerImg', answerImg)

      await hookWithToast(createCard({ id: params.id, formData }), 'Карта успешно добавлена')
    } else if (open === 'editCard') {
      const formData = new FormData()

      formData.append('question', question)
      formData.append('answer', answer)
      questionImg && formData.append('questionImg', questionImg)
      answerImg && formData.append('answerImg', answerImg)

      await hookWithToast(editItem({ id: cardId, formData }), 'Карта успешно обновлена')
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const deleteCardOrPack = async () => {
    if (open === 'deleteCard') {
      await hookWithToast(deleteItem({ id: cardId }), 'Карта успешно удалена')
    } else if (open === 'deletePack') {
      const result = await hookWithToast(deleteDeck({ id: cardId }), 'Колода успешно удалена')

      if (result?.success) {
        navigate('/')
      }
    }
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }
  const editPack = async () => {
    const formData = new FormData()

    formData.append('name', packName)
    formData.append('isPrivate', String(privatePack))
    img && formData.append('cover', img)

    await hookWithToast(editDeck({ id: cardId, formData }), 'Колода успешно обновлена')

    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }

  const dropDownMenu = [
    {
      id: 1,
      component: (
        <Button as={Link} to={`/learn-deck/${params.id}`} variant={'link'} className={s.buttonDrop}>
          <Play />
          <Typography variant={'Caption'}>Learn</Typography>
        </Button>
      ),
    },
    {
      id: 2,
      component: (
        <Button variant={'link'} className={s.buttonDrop} onClick={() => openPackModal('editPack')}>
          <Edit />
          <Typography variant={'Caption'}>Edit</Typography>
        </Button>
      ),
    },
    {
      id: 3,
      component: (
        <Button
          variant={'link'}
          className={s.buttonDrop}
          onClick={() => openPackModal('deletePack')}
        >
          <Trash />
          <Typography variant={'Caption'}>Delete</Typography>
        </Button>
      ),
    },
  ]

  if (isLoading) return <Loader />

  return (
    <div className={s.myPackBlock}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      <div className={s.headBlock}>
        <div className={s.titleAndCover}>
          <div className={s.titleMenu}>
            <Typography variant={'large'}>{data?.name}</Typography>
            <DropDown items={dropDownMenu} trigger={<SubMenu />} />
          </div>
          {data?.cover && <img src={data.cover} alt="cover" className={s.cover} />}
        </div>
        <Button variant={'primary'} onClick={addCardModalHandler}>
          Add New Card
        </Button>
      </div>
      <TextField
        value={search}
        placeholder={'Type to find...'}
        onChangeText={event => setSearch(event)}
        onSearchClear={() => setSearch('')}
        type={'searchType'}
        className={s.textField}
      />
      <MyDeckTable dataCards={dataCards} sort={sort} setSort={setSort} setCardId={setCardId} />
      <AddEditCardModal onSubmit={addOrEditCard} />
      <AddEditDeckModal onSubmit={editPack} />
      <DeleteDeckCardModal onSubmit={deleteCardOrPack} />
      <div className={s.pagination}>
        <Pagination
          count={dataCards?.pagination.totalPages}
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
    </div>
  )
}
