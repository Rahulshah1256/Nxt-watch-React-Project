import React, {useContext} from 'react'
import {CgPlayListAdd} from 'react-icons/cg'
import {
  SavedContainer,
  SavedTitleIconContainer,
  SavedVideoTitle,
  SavedVideoList,
  SavedText,
  NoSavedVideosView,
  NoSavedVideosImage,
  NoSavedVideosHeading,
  NoSavedVideosNote,
} from './styledComponents'
import nxtWatchContext from '../../context/nxtWatchContext'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import VideoCard from '../VideoCard'

const SavedVideos = () => {
  const {isDarkTheme, savedVideos} = useContext(nxtWatchContext)

  const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
  const headingColor = isDarkTheme ? '#f1f5f9' : '#1e293b'
  const noteColor = isDarkTheme ? '#e2e8f0' : '#475569'

  return (
    <>
      <Header />
      <NavigationBar />
      <SavedContainer data-testid="savedVideos" bgColor={bgColor}>
        <SavedVideoTitle>
          <SavedTitleIconContainer>
            <CgPlayListAdd size={35} color="#ff0000" />
          </SavedTitleIconContainer>
          <SavedText color={textColor}>Saved Videos</SavedText>
        </SavedVideoTitle>
        {savedVideos.length > 0 ? (
          <SavedVideoList>
            {savedVideos.map(eachVideo => (
              <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
            ))}
          </SavedVideoList>
        ) : (
          <NoSavedVideosView>
            <NoSavedVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <NoSavedVideosHeading headingColor={headingColor}>
              No saved videos found
            </NoSavedVideosHeading>
            <NoSavedVideosNote noteColor={noteColor}>
              You can save your videos while watching them
            </NoSavedVideosNote>
          </NoSavedVideosView>
        )}
      </SavedContainer>
    </>
  )
}

export default SavedVideos
