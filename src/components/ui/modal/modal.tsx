import { ComponentProps, FC } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'

import { Typography } from '../typography'

type PropsType = {
  open: boolean
  onClose?: () => void
  showCloseButton?: boolean
  title?: string
} & ComponentProps<'div'>

export const Modal: FC<PropsType> = ({
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
          <DialogOverlay />
          <DialogContent>
            <header>
              <DialogTitle asChild>
                <Typography variant={'H2'}>{title}</Typography>
              </DialogTitle>
            </header>
            <div>{children}</div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  )
}
