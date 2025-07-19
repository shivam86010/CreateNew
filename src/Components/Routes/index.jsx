import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MainPage from '../../Pages/index';
import SpeedrunChallenge from '../../Pages/SpeedrunChallenge';

const index = () => {
  return (
   <Routes>
       <Route path='/' element={<MainPage />} />
       <Route path='speedrunchallenge' element={<SpeedrunChallenge />} />
   </Routes>
  )
}

export default index
