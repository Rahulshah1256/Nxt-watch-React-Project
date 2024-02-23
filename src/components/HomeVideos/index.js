import { useContext } from 'react'
import nxtWatchContext from '../../context/nxtWatchContext'
import HomeVideoCard from '../HomeVideoCard'
import {
  NoVideosView,
  NoVideosImage,
  NoVideosHeading,
  NoVideosNote,
  RetryButton,
  VideoCardList,
} from './styledComponents'

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
        <VideoCardList>
          {homeVideos.map(eachVideo => (
            <HomeVideoCard video={eachVideo} key={eachVideo.id} />
          ))}
        </VideoCardList>
      ) : (
        <NoVideosView>
          <NoVideosImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <NoVideosHeading headingColor={headingColor}>
            No Search results found
          </NoVideosHeading>
          <NoVideosNote noteColor={noteColor}>
            Try different keywords or remove search filter
          </NoVideosNote>
          <RetryButton type="button" onClick={onClickRetry}>
            Retry
          </RetryButton>
        </NoVideosView>
      )}
    </>
  )
}

export default HomeVideos
