import { CardsResponse } from '../../../featchers'
import { Sort } from '../../../shared/ui'

export type MyDeckTableType = {
  dataCards: CardsResponse | undefined
  setCardId: (cardId: string) => void
  sort: Sort
  setSort: (value: Sort) => void
}

export type Column = {
  key: string
  title: string
  sortable?: boolean
}
export interface CardResponse {
  id: string
  question: string
  answer: string
  updated: string
  grade: number
  questionImg?: string
  answerImg?: string
}
