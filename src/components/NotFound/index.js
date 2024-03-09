import Header from '../Header';
import NavigationBar from '../NavigationBar';
import nxtWatchContext from '../../context/nxtWatchContext';

const NotFound = () => (
  <nxtWatchContext.Consumer>
    {value => {
      const { isDarkTheme } = value;

      const bgColor = isDarkTheme ? '#181818' : '#f9f9f9';
      const headingColor = isDarkTheme ? '#f1f5f9' : '#1e293b';
      const noteColor = isDarkTheme ? '#e2e8f0' : '#475569';

      const notFindImageUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png';

      return (
        <>
          <Header />
          <NavigationBar />
          <div className="not-found-container" style={{ backgroundColor: bgColor }}>
            <div className="not-found-videos-view">
              <img className="not-found-videos-image" src={notFindImageUrl} alt="not found" />
              <h1 className="not-found-videos-heading" style={{ color: headingColor }}>
                Page Not Found
              </h1>
              <p className="not-found-videos-note" style={{ color: noteColor }}>
                We are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </>
      );
    }}
  </nxtWatchContext.Consumer>
);

export default NotFound;
