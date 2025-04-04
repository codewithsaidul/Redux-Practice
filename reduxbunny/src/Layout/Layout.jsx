import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'

const Layout = () => {
  return (
    <div className='app'>
        <Navbar />
        <Home />
        <Footer />
    </div>
  )
}

export default Layout