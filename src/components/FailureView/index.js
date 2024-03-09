import { useContext } from 'react';
import nxtWatchContext from '../../context/nxtWatchContext';

const FailureView = ({ onRetry }) => {
  const { isDarkTheme } = useContext(nxtWatchContext);
  const headingColor = isDarkTheme ? '#f1f5f9' : '#1e293b';
  const noteColor = isDarkTheme ? '#e2e8f0' : '#475569';

  const failureImageUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png';

  const onClickRetry = () => {
    onRetry();
  };

  return (
    <div className="failure-view">
      <img className="failed-image" src={failureImageUrl} alt="failure view" />
      <h1 className="failed-heading" style={{ color: headingColor }}>
        Oops! Something Went Wrong
      </h1>
      <p className="failed-note" style={{ color: noteColor }}>
        We are having some trouble to complete your request. <br /> Please try again later.
      </p>
      <button className="retry-button" type="button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  );
};

export default FailureView;
