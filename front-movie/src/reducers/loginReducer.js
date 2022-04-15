import movieService from '../services/movieService'
import Cookies from 'js-cookie';

const userSet = (user) => {
  return ({
    type: 'LOGIN',
    data: {
      user_name: Cookies.get('user_name')
    }
  })
}

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('loggeduserJSON', loggedUserJSON)
    console.log('cookie user_name', Cookies.get('user_name'))
    console.log('cookie session', Cookies.get('session_token'))
    /* 
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      //dispatch(userSet(user))
      //movieService.setToken(user.token)

      //Cookies.set('user_name', user)
     
    }
    */
    if (Cookies.get('user_name') !== undefined) {
      const un = Cookies.get('user_name')
      dispatch(setLoggedUser(un))
    }
  }
}

export const setLoggedUser = (user) => {
  console.log('cookie user_name', Cookies.get('user_name'))
  console.log('cookie session', Cookies.get('session_token'))
  return ({
    type: 'LOGIN',
    data: {
      user_name: Cookies.get('user_name')
    }
  })
}

export const logout = () => {
  return ({
    type: 'LOGOUT'
  })
}

const loginReducer = (state = null, action) => {

  switch (action.type) {
    case 'GET_USER':
      return state
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default loginReducer