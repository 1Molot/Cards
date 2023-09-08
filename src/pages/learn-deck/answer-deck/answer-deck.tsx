import { FC, useState } from 'react'

import { Button, RadioGroupDemo, Typography } from '../../../shared/ui'

import s from './answer-deck.module.scss'

type PropsType = {
  answer?: string
  answerImg?: string
  setNewQuestion: (grade: number) => void
}
export const AnswerDeck: FC<PropsType> = ({ answer, answerImg, setNewQuestion }) => {
  const [value, setValue] = useState(1)
  const options = [
    { id: 1, value: 'Did not know' },
    { id: 2, value: 'Forgot' },
    { id: 3, value: 'A lot of though' },
    { id: 4, value: 'Confused' },
    { id: 5, value: 'Knew the answer' },
  ]

  const onClickHandler = () => {
    setNewQuestion(value)
  }

  return (
    <div className={s.answerBlock}>
      <Typography variant={'Subtitle1'} className={s.title}>
        Answer:{' '}
        <Typography variant={'Body1'} className={s.answer}>
          {answer}
        </Typography>
        {answerImg && <img src={answerImg} className={s.questionImg} alt={'картинка для ответа'} />}
      </Typography>
      <Typography variant={'Subtitle1'} className={s.grade}>
        Rate yourself:
      </Typography>
      <RadioGroupDemo options={options} classname={s.radio} onChangeOption={setValue} />
      <Button onClick={onClickHandler}>Next Question</Button>
    </div>
  )
}
