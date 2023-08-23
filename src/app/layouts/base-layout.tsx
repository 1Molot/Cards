import { Outlet } from 'react-router-dom'

import { useMeQuery } from '../../featchers'
import { GlobalToast, Header } from '../../shared/lib'

export const BaseLayout = () => {
  const { data } = useMeQuery()

  return (
    <div>
      <Header data={data} />
      <GlobalToast />
      <Outlet />
    </div>
  )
}
