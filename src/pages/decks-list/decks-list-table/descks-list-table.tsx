import { FC } from 'react'

import { useAppDispatch } from '../../../app/providers/store-provider/store.ts'
import { modalActions } from '../../../featchers'
import { TableElement } from '../../../shared/ui'
import { HeaderTable } from '../../header-table'
import { TableListRow } from '../table-list-row'
import { Column, PropsType } from '../type'

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
    title: '',
  },
]

export const DecksListTable: FC<PropsType> = ({
  data,
  authData,
  setIsMyPackHandler,
  setCardId,
  sort,
  setSort,
}) => {
  const dispatch = useAppDispatch()

  const onClickNameDeckHandler = (authorId: string) => {
    if (setIsMyPackHandler) {
      setIsMyPackHandler(authorId === authData?.id)
    }
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
                ? `/my-deck/${el.id}`
                : `/empty-deck/${el.name}/${el.id}`
              : `/friends-deck/${el.id}`

          return (
            <TableListRow
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
