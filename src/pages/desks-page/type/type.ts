import { DecksResponse, ResponseUserType } from '../../../featchers'
import { Sort } from '../../../shared/ui'

export type HeaderTableType = {
  columns: Column[]
  sort?: Sort
  onSort?: (sort: Sort | null) => void
}

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

export type PropsType = {
  data: DecksResponse | undefined
  authData?: ResponseUserType | null
  setIsMyPackHandler?: (isMyPack: boolean) => void
  setCardId: (cardId: string) => void
  sort: Sort
  setSort: (value: Sort) => void
}

export type TableRowProps = {
  el: DeckItem
  lastRoute: string
  isAuthor: boolean
  onClickNameDeckHandler: (authorId: string) => void
  onEditHandler: (name: string, cardId: string, isPrivate: boolean, img: string | undefined) => void
  onDeleteHandler: (name: string, cardId: string) => void
}

export type DeckItem = {
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
