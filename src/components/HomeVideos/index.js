import { useContext } from 'react'
import nxtWatchContext from '../../context/nxtWatchContext'
import HomeVideoCard from '../HomeVideoCard'

import './index.css'

const HomeVideos = ({ homeVideos, onRetry }) => {
  const { isDarkTheme } = useContext(nxtWatchContext)
  const videosCount = homeVideos.length

  const onClickRetry = () => {
    onRetry()
  }

  const headingColor = isDarkTheme ? '#f1f5f9' : '#1e293b'
  const noteColor = isDarkTheme ? '#e2e8f0' : '#475569'

  return (
    <>
      {videosCount > 0 ? (
        <ul className="video-card-list">
          {homeVideos.map(eachVideo => (
            <HomeVideoCard video={eachVideo} key={eachVideo.id} />
          ))}
        </ul>
      ) : (
        <div className="no-videos-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="no-videos-image"
          />
          <h1 className="no-videos-heading" style={{ color: headingColor }}>
            No Search results found
          </h1>
          <p className="no-videos-note" style={{ color: noteColor }}>
            Try different keywords or remove search filter
          </p>
          <button type="button" className="retry-button" onClick={onClickRetry}>
            Retry
          </button>
        </div>
      )}
    </>
  )
}

export default HomeVideos
