import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import movieReducer from './reducers/movieReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  movies: movieReducer,
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