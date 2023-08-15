import { ReactNode } from 'react'

import { Header } from '../../shared/lib/header'

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header isAuth={false} />
      {children}
    </div>
  )
}
