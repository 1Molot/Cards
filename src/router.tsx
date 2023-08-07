import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Decks } from './pages/desks/desks.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Decks />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>hello</div>,
  },
]

const router = createBrowserRouter([
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

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
