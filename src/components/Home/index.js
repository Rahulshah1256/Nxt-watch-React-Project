import React, {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import nxtWatchContext from '../../context/nxtWatchContext'
import HomeVideos from '../HomeVideos'
import FailureView from '../FailureView'
import {
  HomeContainer,
  BannerContainer,
  BannerImage,
  BannerText,
  BannerButton,
  BannerLeftPart,
  BannerRightPart,
  BannerCloseButton,
  SearchContainer,
  SearchInput,
  SearchIconContainer,
  LoaderContainer,
} from './styledComponents'

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

  useEffect(() => {
    getVideos()
  }, [])

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
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
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
      <HomeContainer data-testid="home" bgColor={bgColor}>
        <BannerContainer data-testid="banner" display={display}>
          <BannerLeftPart>
            <BannerImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <BannerText>
              Buy Nxt Watch Premium prepaid plans with <br /> UPI
            </BannerText>
            <BannerButton type="button">GET IT NOW</BannerButton>
          </BannerLeftPart>
          <BannerRightPart>
            <BannerCloseButton data-testid="close" onClick={onCloseBanner}>
              <AiOutlineClose size={25} />
            </BannerCloseButton>
          </BannerRightPart>
        </BannerContainer>
        <SearchContainer>
          <SearchInput
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={onChangeInput}
            color={textColor}
          />
          <SearchIconContainer
            data-testid="searchButton"
            onClick={getSearchResults}
          >
            <AiOutlineSearch size={20} />
          </SearchIconContainer>
        </SearchContainer>
        {renderHomeVideos()}
      </HomeContainer>
    </>
  )
}

export default Home
