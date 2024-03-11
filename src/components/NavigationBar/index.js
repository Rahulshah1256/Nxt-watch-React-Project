import {useContext, useState} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {Link} from 'react-router-dom'
import nxtWatchContext from '../../context/nxtWatchContext'

import './index.css'

const NavigationBar = () => {
  const {isDarkTheme, activeTab, changeTab} = useContext(nxtWatchContext)
  const [navItems] = useState([
    {label: 'Home', icon: AiFillHome, path: '/'},
    {label: 'Trending', icon: HiFire, path: '/trending'},
    {label: 'Gaming', icon: SiYoutubegaming, path: '/gaming'},
    {label: 'Saved Videos', icon: CgPlayListAdd, path: '/saved-videos'},
  ])

  const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
  const activeTabBg = isDarkTheme ? '#475569' : '#cbd5e1'

  const handleClick = (label, path) => {
    changeTab(label)
    // You can add additional logic here if needed
  }

  return (
    <div className="nav-bar">
      <div
        className="navigation-lg-container"
        style={{backgroundColor: bgColor}}
      >
        <ul className="nav-options">
          {navItems.map(({label, icon: Icon, path}) => (
            <li className="nav-link" key={label}>
              <Link
                to={path}
                className="nav-link-container"
                style={{
                  backgroundColor: activeTab === label ? activeTabBg : 'none',
                }}
                onClick={() => handleClick(label, path)}
              >
                <Icon
                  size={30}
                  color={activeTab === label ? '#ff0b37' : '#909090'}
                />
                <p className="nav-text" style={{color: textColor}}>
                  {label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="contact-info">
          <p className="contact-heading" style={{color: textColor}}>
            CONTACT US
          </p>
          <div className="contact-icons">
            <img
              className="contact-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <img
              className="contact-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <img
              className="contact-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </div>
          <p className="contact-note" style={{color: textColor}}>
            Enjoy! Now to see your channels and recommendations!
          </p>
        </div>
      </div>
      <nav
        className="navigation-small-container"
        style={{backgroundColor: bgColor}}
      >
        {navItems.map(({label, icon: Icon, path}) => (
          <Link to={path} key={label}>
            <Icon
              size={30}
              onClick={() => handleClick(label, path)}
              color={activeTab === label ? '#ff0b37' : '#909090'}
            />
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default NavigationBar
