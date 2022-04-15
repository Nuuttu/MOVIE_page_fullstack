import React, { useState, useRef } from 'react'
import LoginForm from './LoginForm'
import Togglable from './Togglable'


import movieService from '../services/movieService'
import loginService from '../services/loginService'

import { setNotification } from '../reducers/notificationReducer'
import { setLoggedUser, logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';


import Cookies from 'js-cookie';


/**
 * TODO:
 * Cookie deleter
 * 
 * 
 * 
 */

const LoginComponent = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      //movieService.setToken(user.token)

      dispatch(setLoggedUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification('logged in successfully', 'success', 4))
    } catch (e) {
      console.log('error', e)
      dispatch(setNotification('wrong credentials', 'error', 4))
    }
  }

  const logoutButton = () => {
    return (
      <div>
        <p>logged in as <b>{user.user_name}</b> <Button variant='outlined' onClick={() => handleLogout()}>logout</Button></p>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.document.cookie = "user_name=;Max-Age=0;"
    window.document.cookie = "session_token=;Max-Age=0;"
    //dispatch(logout())
    window.location.reload()
  }

  const loginFormRef = useRef()

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={loginFormRef}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const userCookie = Cookies.get('user_name')

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && logoutButton()}
    </div>
  )
}

export default LoginComponent