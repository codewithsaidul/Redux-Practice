import React from 'react'
import Footer from '../components/Shared/Footer'
import Navbar from '../components/Shared/Navbar'
import Home from '../pages/Home'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default Layout