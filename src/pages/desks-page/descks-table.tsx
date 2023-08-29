import { FC } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppDispatch } from '../../app/providers/store-provider/store.ts'
import { Edit } from '../../assets/icons/edit.tsx'
import { Play } from '../../assets/icons/play.tsx'
import { Trash } from '../../assets/icons/trash.tsx'
import { DecksResponse, modalActions, ResponseUserType } from '../../featchers'
import { Button, Sort, TableElement } from '../../shared/ui'

import { HeaderTable } from './header-table.tsx'
import s from './table-packs-list.module.scss'

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'created',
    title: 'Created by',
    sortable: true,
  },
  {
    key: 'activity',
    title: 'Actions',
  },
]

type PropsType = {
  data: DecksResponse | undefined
  authData?: ResponseUserType | null
  setIsMyPackHandler?: (isMyPack: boolean) => void
  setCardId: (cardId: string) => void
  sort: Sort
  setSort: (value: Sort) => void
}

type TableRowProps = {
  el: DeckItem
  lastRoute: string
  isAuthor: boolean
  onClickNameDeckHandler: (authorId: string) => void
  onEditHandler: (name: string, cardId: string, isPrivate: boolean, img: string | undefined) => void
  onDeleteHandler: (name: string, cardId: string) => void
}

type DeckItem = {
  id: string
  name: string
  cardsCount: number
  updated: string
  author: {
    id: string
    name: string
  }
  isPrivate: boolean
  cover?: string
}

const TableRow: FC<TableRowProps> = ({
  el,
  lastRoute,
  isAuthor,
  onClickNameDeckHandler,
  onEditHandler,
  onDeleteHandler,
}) => {
  const { id, name, cardsCount, updated, author, isPrivate, cover } = el

  const handleEdit = () => {
    onEditHandler(name, id, isPrivate, cover)
  }

  const handleDelete = () => {
    onDeleteHandler(name, id)
  }

  return (
    <TableElement.Row key={id}>
      <TableElement.Cell>
        <Button
          as={Link}
          to={lastRoute}
          variant="link"
          onClick={() => onClickNameDeckHandler(author.id)}
          className={s.nameOfDeckButton}
        >
          {cover && (
            <div className={s.nameImg}>
              <img src={cover} alt="img" />
            </div>
          )}
          {name}
        </Button>
      </TableElement.Cell>
      <TableElement.Cell>{cardsCount}</TableElement.Cell>
      <TableElement.Cell>{new Date(updated).toLocaleDateString('ru-RU')}</TableElement.Cell>
      <TableElement.Cell>{author.name}</TableElement.Cell>
      <TableElement.Cell>
        <div className={s.icons}>
          {cardsCount ? (
            <Link to={`/learn-pack/${id}`}>
              <Play className={s.icon} />
            </Link>
          ) : (
            <Play className={s.icon} onClick={() => toast.error('No cart')} />
          )}
          {isAuthor && (
            <>
              <Edit className={s.icon} onClick={handleEdit} />
              <Trash className={s.icon} onClick={handleDelete} />
            </>
          )}
        </div>
      </TableElement.Cell>
    </TableElement.Row>
  )
}

export const DeskTable: FC<PropsType> = ({
  data,
  authData,
  setIsMyPackHandler,
  setCardId,
  sort,
  setSort,
}) => {
  const dispatch = useAppDispatch()

  const onClickNameDeckHandler = (authorId: string) => {
    setIsMyPackHandler?.(authorId === authData?.id)
  }

  const onEditHandler = (
    name: string,
    cardId: string,
    isPrivate: boolean,
    img: string | undefined
  ) => {
    dispatch(modalActions.setOpenModal('editPack'))
    dispatch(modalActions.setPackName(name))
    dispatch(modalActions.setPrivatePack(isPrivate))
    dispatch(modalActions.setEditImg(img))
    setCardId(cardId)
  }

  const onDeleteHandler = (name: string, cardId: string) => {
    dispatch(modalActions.setOpenModal('deletePack'))
    dispatch(modalActions.setPackName(name))
    setCardId(cardId)
  }

  return (
    <TableElement.Root>
      <HeaderTable columns={columns} sort={sort} onSort={setSort} />
      <TableElement.Body>
        {data?.items?.map(el => {
          const lastRoute =
            // eslint-disable-next-line
            el.author.id === authData?.id
              ? el.cardsCount !== 0
                ? `/my-pack/${el.id}`
                : `/empty-pack/${el.name}/${el.id}`
              : `/friends-pack/${el.id}`

          return (
            <TableRow
              isAuthor={el.author.id === authData?.id}
              key={el.id}
              el={el}
              lastRoute={lastRoute}
              onClickNameDeckHandler={onClickNameDeckHandler}
              onEditHandler={onEditHandler}
              onDeleteHandler={onDeleteHandler}
            />
          )
        })}
      </TableElement.Body>
    </TableElement.Root>
  )
}
