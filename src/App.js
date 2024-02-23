import React, { useState } from 'react'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import VideoDetailView from './components/VideoDetailView'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'


import './App.css'
import nxtWatchContext from './context/nxtWatchContext'

// Replace your code here
const App = () => {

    const [savedVideos, setSavedVideos] = useState([]);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
  
    const changeTab = tab => {
      setActiveTab(tab);
    };
  
    const toggleTheme = () => {
      setIsDarkTheme(prevState => !prevState);
    };
  
    const addVideo = video => {
      const index = savedVideos.findIndex(eachVideo => eachVideo.id === video.id);
      if (index === -1) {
        setSavedVideos([...savedVideos, video]);
      } else {
        const updatedSavedVideos = savedVideos.filter(
          eachVideo => eachVideo.id !== video.id
        );
        setSavedVideos(updatedSavedVideos);
      }
    };
  

 
    return (
        <nxtWatchContext.Provider
        value={{
            savedVideos,
        isDarkTheme,
        activeTab,
        toggleTheme,
        addVideo,
        changeTab
           
           
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
          path='/videos/:id'
          element={
            <ProtectedRoute>
              <VideoDetailView />
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
        <Route
          path='/saved-videos'
          element={
            <ProtectedRoute>
              <SavedVideos />
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
