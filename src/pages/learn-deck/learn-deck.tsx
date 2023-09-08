import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Back } from '../../assets/icons/back.tsx'
import { useGetDeckQuery, useLearnDeckQuery, useUpdateGradeCardMutation } from '../../featchers'
import { Button, Card, Typography } from '../../shared/ui'

import { AnswerDeck } from './answer-deck'
import s from './learn-deck.module.scss'

export const LearnDeck = () => {
  const params = useParams<{ id: string }>()
  const [showAnswer, setShowAnswer] = useState(false)

  const { data: deck } = useGetDeckQuery({ id: params.id })
  const { data: randomCard } = useLearnDeckQuery({
    id: params.id,
  })

  const [updateCardGrade] = useUpdateGradeCardMutation()

  const updateCardGradeHandler = (grade: number) => {
    updateCardGrade({ id: deck?.id, cardId: randomCard?.id, grade })
    setShowAnswer(false)
  }

  return (
    <div className={s.learnDeckPage}>
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      {deck?.cardsCount ? (
        <Card className={s.cardBlock}>
          <Typography variant={'large'} className={s.title}>
            Learn &quot;{deck?.name}&quot;
          </Typography>
          <Typography variant={'Subtitle1'}>
            Question:{' '}
            <Typography variant={'Body1'} className={s.question}>
              {randomCard?.question}
            </Typography>
            {randomCard?.questionImg && (
              <img
                src={randomCard?.questionImg}
                className={s.questionImg}
                alt={'картинка для вопроса'}
              />
            )}
          </Typography>
          <Typography variant={'Body2'} className={s.info}>
            Количество попыток ответов на вопрос: {randomCard?.shots}
          </Typography>
          {!showAnswer ? (
            <Button variant={'primary'} onClick={() => setShowAnswer(!showAnswer)}>
              Show Answer
            </Button>
          ) : (
            <AnswerDeck
              answer={randomCard?.answer}
              answerImg={randomCard?.answerImg}
              setNewQuestion={updateCardGradeHandler}
            />
          )}
        </Card>
      ) : (
        <Typography variant={'large'} className={s.error}>
          На данный момент владелец колоды не создал карточки
        </Typography>
      )}
    </div>
  )
}
