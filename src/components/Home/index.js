import React, {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import nxtWatchContext from '../../context/nxtWatchContext'
import HomeVideos from '../HomeVideos'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [homeVideos, setHomeVideos] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [bannerDisplay, setBannerDisplay] = useState('flex')

  useEffect(() => {
    getVideos()
  }, []) // Run only on initial render

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.videos.map(eachVideo => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
          publishedAt: eachVideo.published_at,
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        }))
        setHomeVideos(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const onCloseBanner = () => {
    setBannerDisplay('none')
  }

  const onChangeInput = event => {
    setSearchInput(event.target.value)
  }

  const getSearchResults = () => {
    getVideos()
  }

  const onRetry = () => {
    setSearchInput('')
    getVideos()
  }

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderVideosView = () => (
    <HomeVideos homeVideos={homeVideos} onRetry={onRetry} />
  )

  const renderFailureView = () => <FailureView onRetry={onRetry} />

  const renderHomeVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  const {isDarkTheme} = useContext(nxtWatchContext)
  const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
  const display = bannerDisplay === 'flex' ? 'flex' : 'none'

  return (
    <>
      <Header />
      <NavigationBar />
      <div
        className="home-container"
        data-testid="home"
        style={{backgroundColor: bgColor}}
      >
        <div
          className="banner-container"
          data-testid="banner"
          style={{display}}
        >
          <div className="banner-left-part">
            <img
              className="banner-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <p className="banner-text">
              Buy Nxt Watch Premium prepaid plans with <br /> UPI
            </p>
            <button className="banner-button" type="button">
              GET IT NOW
            </button>
          </div>
          <div className="banner-right-part">
            <button
              className="banner-close-button"
              data-testid="close"
              onClick={onCloseBanner}
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
        </div>
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={onChangeInput}
            style={{color: textColor}}
          />
          <button
            className="search-icon-container"
            data-testid="searchButton"
            onClick={getSearchResults}
          >
            <AiOutlineSearch size={20} />
          </button>
        </div>
        {renderHomeVideos()}
      </div>
    </>
  )
}

export default Home
