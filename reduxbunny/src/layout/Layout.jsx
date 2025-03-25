import React from 'react'
import Footer from '../components/Shared/Footer'
import Navbar from '../components/Shared/Navbar'
import VideoDescription from '../pages/VideoDescription'

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* <Home /> */}
      <VideoDescription />
      <Footer />
    </div>
  )
}

export default Layout