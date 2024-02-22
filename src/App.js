import React, { useState } from 'react'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
//import VideoDetailView from './components/VideoDetailView'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
//import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'


import './App.css'
import nxtWatchContext from './context/nxtWatchContext'

// Replace your code here
const App = () => {

    const [isDarkTheme, setIsDarkTheme] = useState(false)
    return (
        <nxtWatchContext.Provider
        value={{
            
            isDarkTheme,
           
          }}
      >
  <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/trending'
          element={
            <ProtectedRoute>
              <TrendingVideos />
            </ProtectedRoute>
          }
        />
        <Route
          path='/gaming'
          element={
            <ProtectedRoute>
              <GamingVideos />
            </ProtectedRoute>
          }
        />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
     </nxtWatchContext.Provider>
      )
}

export default App
