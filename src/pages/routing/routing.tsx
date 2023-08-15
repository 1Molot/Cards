import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { GlobalHistory } from '../../shared/utils/global-navigate.tsx'
import { Decks } from '../desks-page'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  // {
  //   path: '/login',
  //   element: <Sign-in />,
  // },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>hello</div>,
  },
]

const routing = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  // const { isLoading, data } = useGetDecksQuery()
  //
  // if (isLoading) return <div>...Loading</div>
  // console.log(data)
  // const auth = useCurrentAuthQuery({})

  return <RouterProvider router={routing} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
