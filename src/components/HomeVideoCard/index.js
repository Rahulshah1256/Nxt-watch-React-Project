import { useContext } from 'react'
import { Link } from 'react-router-dom'
import nxtWatchContext from '../../context/nxtWatchContext'
import './index.css'

const HomeVideoCard = ({ video }) => {
  const { isDarkTheme } = useContext(nxtWatchContext)
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = video

  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail-image" />
        <div className="video-details">
          <img src={profileImageUrl} alt="channel logo" className="profile-image" />
          <div className="content-section">
            <p className="title" style={{ color: textColor }}>{title}</p>
            <p className="channel-name" style={{ color: textColor }}>{name}</p>
            <p className="views-and-date" style={{ color: textColor }}>
              {viewCount} views<span className="dot"> &#8226; </span> {publishedAt}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideoCard
