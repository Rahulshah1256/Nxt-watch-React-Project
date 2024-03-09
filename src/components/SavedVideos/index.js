import React, { useContext } from 'react';
import { CgPlayListAdd } from 'react-icons/cg';
import nxtWatchContext from '../../context/nxtWatchContext';
import Header from '../Header';
import NavigationBar from '../NavigationBar';
import VideoCard from '../VideoCard';

const SavedVideos = () => {
  const { isDarkTheme, savedVideos } = useContext(nxtWatchContext);

  const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9';
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20';
  const headingColor = isDarkTheme ? '#f1f5f9' : '#1e293b';
  const noteColor = isDarkTheme ? '#e2e8f0' : '#475569';

  return (
    <>
      <Header />
      <NavigationBar />
      <div className="saved-container" data-testid="savedVideos" style={{ backgroundColor: bgColor }}>
        <div className="saved-title">
          <div className="saved-icon-container">
            <CgPlayListAdd size={35} color="#ff0000" />
          </div>
          <h1 className="saved-text" style={{ color: textColor }}>Saved Videos</h1>
        </div>
        {savedVideos.length > 0 ? (
          <ul className="saved-video-list">
            {savedVideos.map(eachVideo => (
              <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
            ))}
          </ul>
        ) : (
          <div className="no-saved-videos-view">
            <img
              className="no-saved-videos-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <h1 className="no-saved-videos-heading" style={{ color: headingColor }}>
              No saved videos found
            </h1>
            <p className="no-saved-videos-note" style={{ color: noteColor }}>
              You can save your videos while watching them
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedVideos;
