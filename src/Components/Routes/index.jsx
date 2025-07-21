import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MainPage from '../../Pages/index';
import SpeedrunChallenge from '../../Pages/SpeedrunChallenge';
import SaasTools from '../../Pages/SaasTools';

const index = () => {
  return (
   <Routes>
       <Route path='/' element={<MainPage />} />
       <Route path='speedrunchallenge' element={<SpeedrunChallenge />} />
       <Route path='saastools' element={<SaasTools />} />
   </Routes>
  )
}

export default index
