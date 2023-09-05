import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { BaseLayout } from '../../app/layouts/base-layout.tsx'
import { CheckEmail, CreateNewPassword, ForgotPassword, SignUp, useMeQuery } from '../../featchers'
import { ConfirmationEmail } from '../../featchers/confirmation-email/confirmation-email.tsx'
import { Loader } from '../../shared/lib'
import { DecksList } from '../decks-list'
import { EmptyDeck } from '../empty-deck'
import { Profile } from '../index.ts'
import { Login } from '../login/login.tsx'
import { MyDeck } from '../my-deck/my-deck.tsx'

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
  {
    path: '/my-deck/:id',
    element: <MyDeck />,
  },
  // {
  //   path: '/friends-deck/:id',
  //   element: <FriendsMyDeck />,
  // },
  {
    path: '/empty-deck/:name/:id',
    element: <EmptyDeck />,
  },
  // {
  //   path: '/learn-deck/:id',
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
