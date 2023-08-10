import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Decks } from '../desks-page'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Decks />,
  },
  // {
  //   path: '/admin',
  //   element: <Decks />,//component
  // },{
  //   path: '/cards-page',
  //   element: <Decks />,//component
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

  return <RouterProvider router={routing} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
