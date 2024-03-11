import React, {useContext} from 'react'
import nxtWatchContext from '../../context/nxtWatchContext'
import './index.css'

const VideoCard = ({videoDetails}) => {
  const {id, title, thumbnailUrl, viewCount} = videoDetails
  const {isDarkTheme} = useContext(nxtWatchContext)
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

  return (
    <a href={`/videos/${id}`} className="video-link">
      <div className="video-list-item">
        <img
          className="video-thumbnail-image"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="video-content-section">
          <p className="video-title" style={{color: textColor}}>
            {title}
          </p>
          <p className="views-and-date" style={{color: textColor}}>
            {viewCount} Watching Worldwide
          </p>
        </div>
      </div>
    </a>
  )
}

export default VideoCard
