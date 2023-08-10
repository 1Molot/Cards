import { PaginatedEntity, PaginatedRequest } from '../../../../shared'

export type GetDecksArgs = PaginatedRequest<{
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: Author['id']
  orderBy?: string
}>
export type DeckIdArgs = {
  id: string
}

export type CreateDeckArgs = {
  name: string
}

export interface Author {
  id: string
  name: string
}

export type DeleteDecksResponse = {
  id: string
  userId: string
  name: string
  isPrivate: true
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export interface Deck {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted: boolean | null
  isBlocked: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type DecksResponse = PaginatedEntity<Deck> & {
  maxCardsCount: number
}

export type SaveDecksLearnResponse = {}
