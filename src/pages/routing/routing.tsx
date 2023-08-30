import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { BaseLayout } from '../../app/layouts/base-layout.tsx'
import {
  CheckEmail,
  CreateNewPassword,
  ForgotPassword,
  Profile,
  SignUp,
  useMeQuery,
} from '../../featchers'
import { ConfirmationEmail } from '../../featchers/confirmation-email/confirmation-email.tsx'
import { Loader } from '../../shared/lib'
import { DecksList } from '../decks-list'
import { Login } from '../login/login.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/recover-password/:token',
    element: <CreateNewPassword />,
  },
  {
    path: '/check-email/:email',
    element: <CheckEmail />,
  },
  {
    path: '/confirm-email/:code',
    element: <ConfirmationEmail />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksList />,
  },
  // {
  //   path: '/my-pack/:id',
  //   element: <MyDeck />,
  // },
  // {
  //   path: '/friends-pack/:id',
  //   element: <FriendsMyDeck />,
  // },
  // {
  //   path: '/empty-pack/:name/:id',
  //   element: <EmptyMyDeck />,
  // },
  // {
  //   path: '/learn-pack/:id',
  //   element: <LearnMyDeck />,
  // },
  {
    path: '/profile',
    element: <Profile />,
  },
]

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <Loader />

  return data ? <Outlet /> : <Navigate to="/login" />
}
