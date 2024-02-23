import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import nxtWatchContext from '../../context/nxtWatchContext'
import {
  ItemLink,
  TrendingListItem,
  TrendingThumbNailImage,
  TrendingVideoDetails,
  TrendingProfileImage,
  TrendingContentSection,
  TrendingTitle,
  TrendingChannelName,
  TrendingViewsAndDate,
  TrendingDot,
} from './styledComponents'

const VideoCard = (props) => {
  const { videoDetails } = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videoDetails
  const { isDarkTheme } = useContext(nxtWatchContext)
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

  return (
    <ItemLink to={`/videos/${id}`} className="link">
      <TrendingListItem>
        <TrendingThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
        <TrendingVideoDetails>
          <TrendingProfileImage src={profileImageUrl} alt="channel logo" />
          <TrendingContentSection>
            <TrendingTitle color={textColor}>{title}</TrendingTitle>
            <TrendingChannelName color={textColor}>{name}</TrendingChannelName>
            <TrendingViewsAndDate color={textColor}>
              {viewCount} views<TrendingDot> &#8226; </TrendingDot>
              {publishedAt}
            </TrendingViewsAndDate>
          </TrendingContentSection>
        </TrendingVideoDetails>
      </TrendingListItem>
    </ItemLink>
  )
}

export default VideoCard
