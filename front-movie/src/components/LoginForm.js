import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label='password'
            type="password"
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant='contained' color='primary' id='login-button' type="submit">login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm