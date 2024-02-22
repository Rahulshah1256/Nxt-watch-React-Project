import { useContext } from 'react'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  FailedView,
  FailedImage,
  FailedHeading,
  FailedNote,
  RetryButton,
} from './styledComponents'

const FailureView = ({ onRetry }) => {
  const { isDarkTheme } = useContext(ThemeAndVideoContext)
  const headingColor = isDarkTheme ? '#f1f5f9' : '#1e293b'
  const noteColor = isDarkTheme ? '#e2e8f0' : '#475569'

  const failureImageUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <FailedView>
      <FailedImage src={failureImageUrl} alt="failure view" />
      <FailedHeading headingColor={headingColor}>
        Oops! Something Went Wrong
      </FailedHeading>
      <FailedNote noteColor={noteColor}>
        We are having some trouble to complete your request. <br /> Please try
        again later.
      </FailedNote>
      <RetryButton type="button" onClick={onClickRetry}>
        Retry
      </RetryButton>
    </FailedView>
  )
}

export default FailureView
