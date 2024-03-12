import React, {useContext} from 'react'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import nxtWatchContext from '../../context/nxtWatchContext'
import './index.css'

const PlayVideoView = props => {
  const {videoDetails, isLiked, isDisLiked, clickLiked, clickDisLiked} = props
  const {isDarkTheme, addVideo, savedVideos} = useContext(nxtWatchContext)
  const textColor = isDarkTheme ? '#64748b' : '#231f20'
  const likeIconColor = isLiked ? '#2563eb' : '#64748b'
  const dislikeIconColor = isDisLiked ? '#2563eb' : '#64748b'

  let isSaved
  const index = savedVideos.findIndex(
    eachVideo => eachVideo.id === videoDetails.id,
  )
  if (index === -1) {
    isSaved = false
  } else {
    isSaved = true
  }

  const saveIconColor = isSaved ? '#2563eb' : textColor

  const onClickLike = () => {
    clickLiked()
  }

  const onClickDislike = () => {
    clickDisLiked()
  }

  const onClickSave = () => {
    addVideo(videoDetails)
  }

  return (
    <div className="video-player">
      <ReactPlayer url={videoDetails.videoUrl} controls width="100%" />
      <p className="play-video-title" style={{color: textColor}}>
        {videoDetails.title}
      </p>
      <div className="play-video-status-container">
        <p className="play-video-status" style={{color: textColor}}>
          {videoDetails.viewCount} views
          <span className="play-video-dot"> &#8226; </span>
          {videoDetails.publishedAt}
        </p>
        <div className="play-social-buttons-container">
          <div className="btn-container">
            <button
              type="button"
              className="social-button"
              style={{color: likeIconColor}}
              onClick={onClickLike}
            >
              <AiOutlineLike size={25} />
              <span className="button-text">Like</span>
            </button>
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="social-button"
              style={{color: dislikeIconColor}}
              onClick={onClickDislike}
            >
              <AiOutlineDislike size={25} />
              <span className="button-text">Dislike</span>
            </button>
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="social-button"
              style={{color: saveIconColor}}
              onClick={onClickSave}
            >
              <BiListPlus size={25} />
              <span className="button-text">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
      <hr className="hr-line" />
      <div className="channel-container">
        <img
          className="channel-image"
          src={videoDetails.profileImageUrl}
          alt="channel logo"
        />
        <div className="channel-info">
          <p className="channel-name" style={{color: textColor}}>
            {videoDetails.name}
          </p>
          <p className="channel-subscribers" style={{color: textColor}}>
            {videoDetails.subscriberCount} Subscribers
          </p>
          <p className="channel-description" style={{color: textColor}}>
            {videoDetails.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlayVideoView
