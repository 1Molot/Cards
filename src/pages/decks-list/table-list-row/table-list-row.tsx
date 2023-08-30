import { FC } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Edit } from '../../../assets/icons/edit.tsx'
import { Play } from '../../../assets/icons/play.tsx'
import { Trash } from '../../../assets/icons/trash.tsx'
import { Button, TableElement } from '../../../shared/ui'
import { TableRowProps } from '../type'

import s from './table-list-row.module.scss'

export const TableListRow: FC<TableRowProps> = ({
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
