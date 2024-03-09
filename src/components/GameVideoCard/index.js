import React, {useContext} from 'react'
import nxtWatchContext from '../../context/nxtWatchContext'
import {
  ItemLink,
  GamingListItem,
  GamingThumbNailImage,
  GamingContentSection,
  GamingTitle,
  GamingViewsAndDate,
} from './styledComponents'

const VideoCard = ({videoDetails}) => {
  const {id, title, thumbnailUrl, viewCount} = videoDetails
  const {isDarkTheme} = useContext(nxtWatchContext)
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

  return (
    <ItemLink to={`/videos/${id}`} className="link">
      <GamingListItem>
        <GamingThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
        <GamingContentSection>
          <GamingTitle color={textColor}>{title}</GamingTitle>
          <GamingViewsAndDate color={textColor}>
            {viewCount} Watching Worldwide
          </GamingViewsAndDate>
        </GamingContentSection>
      </GamingListItem>
    </ItemLink>
  )
}

export default VideoCard
