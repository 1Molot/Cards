import { FC } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { MyDeckTable } from './my-deck-table'
import { MyDeckTableType } from './type'

export const MyDeck: FC<MyDeckTableType> = ({ dataCards, setCardId, sort, setSort }) => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  return <MyDeckTable dataCards={dataCards} sort={sort} setSort={setSort} setCardId={setCardId} />
}
