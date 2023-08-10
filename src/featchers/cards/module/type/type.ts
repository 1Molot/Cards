export type GetCardsArg = {
  id: string
}
export type CardsResponse = {
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
  rating: number
  created: string
  updated: string
}
export type PatchCardsArg = {
  id: string
  questionImg: string
  answerImg: string
  question: string
  answer: string
  questionVideo: string
  answerVideo: string
}
