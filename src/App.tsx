import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Menu/Navbar'

const App: React.FC = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App