const notificationHide = () => {
  return {
    type: 'HIDE'
  }
}

const notificationSet = (text, theme) => {
  return {
    type: 'SET_TEXT',
    data: {
      'text': text,
      'theme': theme
    }
  }
}

var timer = 0
export const setNotification = (text, theme, time) => {
  return dispatch => {
    dispatch(notificationSet(text, theme))
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(notificationHide())

    }, time * 1000)
  }
}

const notificationReducer = (state = null, action) => {

  switch (action.type) {
    case 'HIDE':
      return null
    case 'SET_TEXT':
      return action.data
    default:
      return state
  }
}

export default notificationReducer