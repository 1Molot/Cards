import { Outlet } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import { useMeQuery } from '../../featchers'
import { GlobalToast } from '../../shared/lib'
import { Header } from '../../shared/ui'

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
