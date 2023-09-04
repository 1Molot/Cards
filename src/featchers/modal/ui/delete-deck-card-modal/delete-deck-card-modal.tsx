import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-provider/store.ts'
import { Modal, Typography } from '../../../../shared/ui'
import { modalActions, selectCardSettings, selectOpen, selectPackSettings } from '../../module'

import s from './delete-deck-card-modal.module.scss'

type PropsType = {
  onSubmit: () => void
}
export const DeleteDeckCardModal: FC<PropsType> = ({ onSubmit }) => {
  const open = useAppSelector(selectOpen)
  const { packName } = useAppSelector(selectPackSettings)
  const { question } = useAppSelector(selectCardSettings)
  const dispatch = useAppDispatch()

  const setClose = () => {
    dispatch(modalActions.setCloseModal({}))
  }
  let openModal
  let titleButton
  let title

  if (open === 'deletePack' || open === 'deleteCard') {
    openModal = true
    titleButton = open === 'deletePack' ? 'Delete Pack' : 'Delete Card'
    title = titleButton
  }

  return (
    <Modal
      title={title}
      titleButton={titleButton}
      open={openModal}
      onClose={setClose}
      showCloseButton={true}
      callBack={onSubmit}
    >
      <Typography variant={'Body1'}>
        Do you really want to remove{' '}
        <Typography variant={'Subtitle1'} className={s.packName}>
          {open === 'deletePack' ? packName : question}?
        </Typography>
        <br />
        All cards will be deleted.
      </Typography>
    </Modal>
  )
}
