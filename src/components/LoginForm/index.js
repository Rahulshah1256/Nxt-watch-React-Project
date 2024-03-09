import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/')
  }
  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderUsernameField = () => (
    <>
      <label className='input-label' htmlFor='username'>
        USERNAME
      </label>
      <input
        type='text'
        id='username'
        className='username-input-field'
        value={username}
        onChange={onChangeUsername}
        placeholder='Username'
      />
    </>
  )

  const renderPasswordField = () => {
    return (
      <>
        <label className='input-label' htmlFor='password'>PASSWORD</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id='password'
          value={password}
          name='password'
          onChange={onChangePassword}
          placeholder='Password'
        />
        <div className='checkbox-container'>
          <input type='checkbox' id='checkbox' onChange={onShowPassword} />
          <label htmlFor='checkbox'>Show Password</label>
        </div>
      </>
    )
  }

  return (
    <div className='app-container'>
      <form className='form-container' onSubmit={onSubmitForm}>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          alt='website logo'
          className='login-logo'
        />
        <div className='input-container'>{renderUsernameField()}</div>
        <div className='input-container'>{renderPasswordField()}</div>
        <button type='submit' className='login-button'>
          Login
        </button>
        {showSubmitError && <p className='submit-error'>*{errorMsg}</p>}
      </form>
    </div>
  )
}
export default LoginForm
