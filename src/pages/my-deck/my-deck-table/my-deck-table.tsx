import { FC } from 'react'

import { useAppDispatch } from '../../../app/providers/store-provider/store.ts'
import { Edit } from '../../../assets/icons/edit.tsx'
import { Trash } from '../../../assets/icons/trash.tsx'
import { modalActions } from '../../../featchers'
import { Grade, TableElement } from '../../../shared/ui/index.ts'
import { HeaderTable } from '../../header-table'
import { CardResponse, Column, MyDeckTableType } from '../type'

import s from './my-deck-table.module.scss'

const columns: Column[] = [
  {
    key: 'question',
    title: 'Question',
    sortable: true,
  },
  {
    key: 'answer',
    title: 'Answer',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'grade',
    title: 'Grade',
    sortable: true,
  },
  {
    key: 'activity',
    title: '',
  },
]

export const MyDeckTable: FC<MyDeckTableType> = ({ dataCards, setCardId, sort, setSort }) => {
  const dispatch = useAppDispatch()

  const onEditHandler = (
    question: string,
    answer: string,
    cardId: string,
    questionImg: string | undefined,
    answerImg: string | undefined
  ) => {
    dispatch(modalActions.setOpenModal('editCard'))
    dispatch(modalActions.setQuestion(question))
    dispatch(modalActions.setAnswer(answer))
    dispatch(modalActions.setQuestionEditImg(questionImg))
    dispatch(modalActions.setAnswerEditImg(answerImg))
    setCardId(cardId)
  }

  const onDeleteHandler = (question: string, cardId: string) => {
    dispatch(modalActions.setOpenModal('deleteCard'))
    dispatch(modalActions.setQuestion(question))
    setCardId(cardId)
  }

  const renderTableRow = (el: CardResponse) => {
    return (
      <TableElement.Row key={el.id}>
        <TableElement.Cell>{el.question}</TableElement.Cell>
        <TableElement.Cell>{el.answer}</TableElement.Cell>
        <TableElement.Cell>{new Date(el.updated).toLocaleDateString('ru-RU')}</TableElement.Cell>
        <TableElement.Cell>
          <Grade rating={el.grade} />
        </TableElement.Cell>
        <TableElement.Cell>
          <div className={s.icons}>
            <Edit
              onClick={() =>
                onEditHandler(el.question, el.answer, el.id, el.questionImg, el.answerImg)
              }
            />
            <Trash onClick={() => onDeleteHandler(el.question, el.id)} />
          </div>
        </TableElement.Cell>
      </TableElement.Row>
    )
  }

  return (
    <TableElement.Root>
      <HeaderTable columns={columns} sort={sort} onSort={setSort} />
      <TableElement.Body>{dataCards?.items.map(renderTableRow)}</TableElement.Body>
    </TableElement.Root>
  )
}
