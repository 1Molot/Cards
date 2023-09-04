import { PaginatedRequest, Pagination } from '../../../../shared/types'

export type GetDecksArgs = PaginatedRequest<{
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: Author['id']
  orderBy?: string | null
}>

export type DecksResponse = {
  maxCardsCount: number
  pagination: Pagination
  items: DeckType[]
}

export type Author = {
  id: string
  name: string
}
export type DeckType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string
  grade: number
  isDeleted?: boolean
  isBlocked?: boolean
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type LearnDeckResponse = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  grade: number
  created: string
  updated: string
}