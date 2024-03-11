import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import nxtWatchContext from '../../context/nxtWatchContext'

import './index.css'

const Header = () => {
  const {isDarkTheme, toggleTheme} = useContext(nxtWatchContext)
  const color = isDarkTheme ? '#ffffff' : '#00306e'
  const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'

  const navigate = useNavigate()

  const onChangeTheme = () => {
    toggleTheme()
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="navbar-header" style={{backgroundColor: bgColor}}>
      <Link to="/" className="logo-link">
        <img
          src={
            isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div className="actions-container">
        <button type="button" className="theme-button" onClick={onChangeTheme}>
          {isDarkTheme ? (
            <BsBrightnessHigh color="#ffffff" size={25} />
          ) : (
            <BsMoon size={25} />
          )}
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-image"
        />
        <Popup
          modal
          trigger={
            <button
              type="button"
              className="logout-button"
              style={{backgroundColor: bgColor, color}}
            >
              Logout
            </button>
          }
        >
          {close => (
            <div className="modal-container">
              <p className="modal-desc">Are you sure, you want to logout?</p>
              <div className="buttons-container">
                <button
                  type="button"
                  className="close-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={onClickLogout}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
        <Popup
          modal
          trigger={
            <button type="button" className="logout-icon-button">
              <FiLogOut size={25} color={color} />
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="modal-container">
              <p className="modal-desc">Are you sure, you want to logout?</p>
              <div className="buttons-container">
                <button
                  type="button"
                  className="close-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={onClickLogout}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default Header
