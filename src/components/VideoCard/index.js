import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import nxtWatchContext from '../../context/nxtWatchContext';

const VideoCard = (props) => {
  const { videoDetails } = props;
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videoDetails;
  const { isDarkTheme } = useContext(nxtWatchContext);
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20';

  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="trending-list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="trending-thumbnail-image" />
        <div className="trending-video-details">
          <img src={profileImageUrl} alt="channel logo" className="trending-profile-image" />
          <div className="trending-content-section">
            <p className="trending-title" style={{ color: textColor }}>{title}</p>
            <p className="trending-channel-name" style={{ color: textColor }}>{name}</p>
            <p className="trending-views-and-date" style={{ color: textColor }}>
              {viewCount} views<span className="trending-dot"> &#8226; </span>
              {publishedAt}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default VideoCard;
