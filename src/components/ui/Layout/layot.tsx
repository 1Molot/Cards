import { Outlet } from 'react-router-dom'

import { Navbar } from '../Navbar/navbar.tsx'

export const Layout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}
