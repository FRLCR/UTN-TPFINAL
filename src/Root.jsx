import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function Root() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Root
