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

// Replace your code here
const App = () => {
    return (
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
        {/* <Route
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
        <Route path='/not-found' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
      )
}

export default App
