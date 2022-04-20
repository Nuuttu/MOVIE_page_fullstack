import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

const SignupForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            id='signup-username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label='password'
            type="password"
            id='signup-password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant='contained' color='primary' id='signup-button' type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default SignupForm