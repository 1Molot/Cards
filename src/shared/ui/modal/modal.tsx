import { ComponentProps, FC } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'

import { Close } from '../../../assets/icons/close.tsx'
import { Button } from '../button'
import { Typography } from '../typography'

import s from './modal.module.scss'

type PropsType = {
  open?: boolean
  onClose?: () => void
  showCloseButton?: boolean
  title?: string
  titleButton?: string
  callBack?: () => void
} & ComponentProps<'div'>

export const Modal: FC<PropsType> = ({
  open = false,
  title,
  onClose,
  children,
  titleButton,
  showCloseButton = true,
  callBack,
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
            <div className={s.buttonBottom}>
              <Button onClick={() => onClose?.()} variant={'secondary'}>
                Cancel
              </Button>
              <Button variant={'primary'} onClick={callBack}>
                {titleButton}
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  )
}
