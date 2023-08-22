import { ReactNode } from 'react'

import { Outlet } from 'react-router-dom'

import { Header } from '../../shared'

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  // const { data } = useMeQuery()

  return (
    <div>
      <Header isAuth={false} />
      {/*<GlobalToast />*/}
      <Outlet />
      {children}
    </div>
  )
}
