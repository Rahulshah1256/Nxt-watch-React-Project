import { useState, useContext } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { HiFire } from 'react-icons/hi'
import { SiYoutubegaming } from 'react-icons/si'
import { CgPlayListAdd } from 'react-icons/cg'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  NavigationLgContainer,
  NavOptions,
  NavLink,
  NavLinkContainer,
  NavText,
  ContactInfo,
  ContactHeading,
  ContactIcons,
  ContactNote,
  ContactImage,
  NavigationSmallContainer,
  NavBar,
} from './styledComponents'

const NavigationBar = () => {
  const { isDarkTheme, activeTab, changeTab } = useContext(ThemeAndVideoContext)
  const [navItems] = useState([
    { label: 'Home', icon: AiFillHome, path: '/' },
    { label: 'Trending', icon: HiFire, path: '/trending' },
    { label: 'Gaming', icon: SiYoutubegaming, path: '/gaming' },
    { label: 'Saved Videos', icon: CgPlayListAdd, path: '/saved-videos' },
  ])

  const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
  const activeTabBg = isDarkTheme ? '#475569' : '#cbd5e1'

  const handleClick = (label, path) => {
    changeTab(label)
    // You can add additional logic here if needed
  }

  return (
    <NavBar>
      <NavigationLgContainer bgColor={bgColor}>
        <NavOptions>
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink key={label} to={path}>
              <NavLinkContainer
                bgColor={activeTab === label ? activeTabBg : 'none'}
                onClick={() => handleClick(label, path)}
              >
                <Icon
                  size={30}
                  color={activeTab === label ? '#ff0b37' : '#909090'}
                />
                <NavText color={textColor}>{label}</NavText>
              </NavLinkContainer>
            </NavLink>
          ))}
        </NavOptions>
        <ContactInfo>
          <ContactHeading color={textColor}>CONTACT US</ContactHeading>
          <ContactIcons>
            <ContactImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <ContactImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <ContactImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </ContactIcons>
          <ContactNote color={textColor}>
            Enjoy! Now to see your channels and recommendations!
          </ContactNote>
        </ContactInfo>
      </NavigationLgContainer>
      <NavigationSmallContainer bgColor={bgColor}>
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink key={label} to={path}>
            <Icon
              size={30}
              onClick={() => handleClick(label, path)}
              color={activeTab === label ? '#ff0b37' : '#909090'}
            />
          </NavLink>
        ))}
      </NavigationSmallContainer>
    </NavBar>
  )
}

export default NavigationBar
