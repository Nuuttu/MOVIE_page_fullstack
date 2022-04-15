import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import movieReducer from './reducers/movieReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  movies: movieReducer,
  login: loginReducer,
})

const store = createStore(
  reducer,

  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('storenow', storeNow)
})