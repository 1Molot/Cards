import { ComponentProps, FC } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'

import { Close } from '../../../assets/image'
import { Typography } from '../typography'

import s from './modal.module.scss'

type ModalType = {
  open: boolean
  onClose?: () => void
  showCloseButton?: boolean
  title?: string
} & ComponentProps<'div'>

export const Modal: FC<ModalType> = ({
  open = false,
  title,
  onClose,
  children,
  showCloseButton = true,
}) => {
  function handleModalClosed() {
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClosed}>
      {open && (
        <DialogPortal>
          <DialogOverlay className={s.overlay} />
          <DialogContent className={s.content}>
            <header className={s.header}>
              <DialogTitle asChild>
                <Typography variant={'H2'}>{title}</Typography>
              </DialogTitle>

              {showCloseButton && (
                <DialogClose className={s.closeButton}>
                  <Close />
                </DialogClose>
              )}
            </header>
            <div className={s.contentBox}>{children}</div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  )
}