import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import {
  AppContainer,
  FormContainer,
  LoginLogo,
  InputContainer,
  LoginButton,
  SubmitError,
  InputLabel,
  UserInput,
  CheckboxContainer,
  Checkbox,
  ShowPassword,
} from './styledComponents'

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
    // Storing JWT token
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
  }
  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
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
      <InputLabel className='input-label' htmlFor='username'>
        USERNAME
      </InputLabel>
      <UserInput
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
        <InputLabel htmlFor='password'>PASSWORD</InputLabel>
        <UserInput
          type={showPassword ? 'text' : 'password'}
          id='password'
          value={password}
          name='password'
          onChange={onChangePassword}
          placeholder='Password'
        />
        <CheckboxContainer>
          <Checkbox type='checkbox' id='checkbox' onChange={onShowPassword} />
          <ShowPassword htmlFor='checkbox'>Show Password</ShowPassword>
        </CheckboxContainer>
      </>
    )
  }

  return (
    <AppContainer>
      <FormContainer onSubmit={onSubmitForm}>
        <LoginLogo
          src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          alt='website logo'
        />
        <InputContainer>{renderUsernameField()}</InputContainer>
        <InputContainer>{renderPasswordField()}</InputContainer>
        <LoginButton type='submit'>Login</LoginButton>
        {showSubmitError && <SubmitError>*{errorMsg}</SubmitError>}
      </FormContainer>
    </AppContainer>
  )
}
export default LoginForm
