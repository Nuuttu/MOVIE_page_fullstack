import React, { useState, useRef } from 'react'
import SignupForm from './SignupForm'
import Togglable from './Togglable'

import signupService from '../services/signupService'

import { setNotification } from '../reducers/notificationReducer'
import { setLoggedUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/loginService'

const SignupComponent = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await signupService.signup({
        username, password,
      })

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
        dispatch(setNotification('signed up and logged in successfully', 'success', 4))
      } catch (e) {
        console.log('error', e)
        dispatch(setNotification('login failed at registering wrong credentials', 'error', 4))
      }

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      //movieService.setToken(user.token)

    } catch (e) {
      console.log('error', e)
      dispatch(setNotification('registering failed: wrong credentials or account already exists', 'error', 4))
    }
  }

  const signupFormRef = useRef()

  const signupForm = () => {
    return (
      <Togglable buttonLabel='Sign up' ref={signupFormRef}>
        <SignupForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleSubmit}
        />
      </Togglable>
    )
  }

  return (
    <div>
      {user === null && signupForm()}
    </div>
  )
}

export default SignupComponent