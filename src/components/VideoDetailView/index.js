import React, {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import nxtWatchContext from '../../context/nxtWatchContext'
import FailureView from '../FailureView'
import PlayVideoView from '../PlayVideoView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const VideoDetailView = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [videoDetails, setVideoDetails] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isDisLiked, setIsDisLiked] = useState(false)
  const {id} = useParams()

  const formattedData = data => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  })

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
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
        const updatedData = formattedData(data)
        setVideoDetails(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error('Error fetching video details:', error)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getVideoDetails()
  }, [])

  const clickLiked = () => {
    setIsLiked(prevState => !prevState.isLiked)
    setIsDisLiked(false)
  }

  const clickDisLiked = () => {
    setIsDisLiked(prevState => !prevState.isDisLiked)
    setIsLiked(false)
  }

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderPlayVideoView = () => (
    <PlayVideoView
      videoDetails={videoDetails}
      clickLiked={clickLiked}
      clickDisLiked={clickDisLiked}
      isLiked={isLiked}
      isDisLiked={isDisLiked}
    />
  )

  const onRetry = () => {
    getVideoDetails()
  }

  const renderFailureView = () => <FailureView onRetry={onRetry} />

  const renderVideoDetailView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPlayVideoView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <nxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

        return (
          <>
            <Header />
            <NavigationBar />
            <div
              className="video-detail-view-container"
              data-testid="videoItemDetails"
              style={{backgroundColor: bgColor}}
            >
              {renderVideoDetailView()}
            </div>
          </>
        )
      }}
    </nxtWatchContext.Consumer>
  )
}

export default VideoDetailView
