import {useContext} from 'react'
import {Link} from 'react-router-dom'
import nxtWatchContext from '../../context/nxtWatchContext'
import {
  ListItem,
  ThumbNailImage,
  VideoDetails,
  ProfileImage,
  ContentSection,
  Title,
  ChannelName,
  ViewsAndDate,
  Dot,
} from './styledComponents'

import './index.css'

const HomeVideoCard = ({video}) => {
  const {isDarkTheme} = useContext(nxtWatchContext)
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
      <ListItem>
        <ThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
        <VideoDetails>
          <ProfileImage src={profileImageUrl} alt="channel logo" />
          <ContentSection>
            <Title color={textColor}>{title}</Title>
            <ChannelName color={textColor}>{name}</ChannelName>
            <ViewsAndDate color={textColor}>
              {viewCount} views<Dot> &#8226; </Dot> {publishedAt}
            </ViewsAndDate>
          </ContentSection>
        </VideoDetails>
      </ListItem>
    </Link>
  )
}

export default HomeVideoCard
