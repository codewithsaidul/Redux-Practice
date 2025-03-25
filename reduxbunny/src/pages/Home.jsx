import React from 'react'
import Tags from '../components/Home/Tags'
import VideoGrid from '../components/Home/VideoGrid'

const Home = () => {
  return (
    <div className='px-4 md:px-12 lg:px-20'>
      <Tags />
      <VideoGrid />
    </div>
  )
}

export default Home