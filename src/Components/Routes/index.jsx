import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MainPage from '../../Pages/index';
import SpeedrunChallenge from '../../Pages/SpeedrunChallenge';
import SaasTools from '../../Pages/SaasTools';
import OfflineGame from '../../Pages/OfflineGame'
import InterviewQuestions from '../../Pages/InterviewQuestion';
import PageNotFound from '../../Pages/PageNotFound'

const index = () => {
  return (
   <Routes>
       <Route path='/' element={<MainPage />} />
       <Route path='speedrunchallenge' element={<SpeedrunChallenge />} />
       <Route path='saastools' element={<SaasTools />} />
       <Route path='offlinegame' element={<OfflineGame />} />
       <Route path='interviewquestions' element={<InterviewQuestions />} />

       <Route path="*" element={<PageNotFound />} />
   </Routes>
  )
}

export default index
