import { useState } from 'react'
import './App.css'
import Router from './Components/Routes/index'
import {Toaster} from './Components/Ui/Toaster'

function App() {
  

  return (
    <>
     
     <Router />
     <Toaster />
    </>
  )
}

export default App
