import { ChangeEvent, FC, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-provider/store.ts'
import { ChangeImgDeck } from '../../../../assets/icons/change-Img-deck.tsx'
// @ts-ignore
import imgDeck from '../../../../assets/icons/imgDeck.png'
import { Button, CheckBox, Modal, TextField } from '../../../../shared/ui'
import { modalActions, selectOpen, selectPackSettings } from '../../module'

import s from './add-edit-pack-modal.module.scss'

type PropsType = {
  onSubmit: () => void
}

export const AddEditPackModal: FC<PropsType> = ({ onSubmit }) => {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectOpen)
  const { packName, privatePack, img, editImg } = useAppSelector(selectPackSettings)

  const setClose = useCallback(() => {
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setClearState({}))
  }, [dispatch])

  const openModal = open === 'addPack'
  const title = openModal ? 'Add New Pack' : 'Edit Pack'
  const titleButton = openModal ? 'Add New Pack' : 'Save Changes'
  // eslint-disable-next-line no-nested-ternary
  const packImg = img
    ? URL.createObjectURL(img)
    : open === 'editPack'
    ? editImg || imgDeck
    : imgDeck

  const setPackName = useCallback(
    (value: string) => {
      dispatch(modalActions.setPackName(value))
    },
    [dispatch]
  )

  const setPrivatePack = useCallback(
    (value: boolean) => {
      dispatch(modalActions.setPrivatePack(value))
    },
    [dispatch]
  )

  const handleChangeCover = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0]

      dispatch(modalActions.setImg(file))
    },
    [dispatch]
  )

  return (
    <Modal
      title={title}
      showCloseButton={true}
      open={openModal}
      onClose={setClose}
      titleButton={titleButton}
      callBack={onSubmit}
    >
      <div>
        <img src={packImg} className={s.packImg} alt="pack img" />
        <label htmlFor="packImg" className={s.labelBlock}>
          <Button as="a" variant="secondary" className={s.changeButton}>
            <ChangeImgDeck /> Change Cover
          </Button>
          <div>
            <input type="file" id="packImg" onChange={handleChangeCover} className={s.input} />
          </div>
        </label>
      </div>
      <TextField
        type="default"
        value={packName}
        onChangeText={setPackName}
        label="Name Pack"
        placeholder="Type name pack"
      />
      <CheckBox
        variant="withText"
        checked={privatePack}
        onChange={() => setPrivatePack(!privatePack)}
        checkBoxText="Private Pack"
      />
    </Modal>
  )
}
