import movieService from '../services/movieservice'
import { setNotification } from './notificationReducer'



export const getAll = () => {
  return async dispatch => {
    const movies = await movieService.getAll()
    var ml
    movies != null && (
      ml = movies.map(m => {
        if (m.Watches !== null) {
          m.Watches = sortWatches(m.Watches)
          m.LastViewing = new Date(m.Watches[0].Date).getTime()
          m.Watchtimes = m.Watches.length
        } else {
          m.LastViewing = null
          if (m.Watches !== null) m.Watchtimes = m.Watches.length
        }
        return m
      })
    )
    dispatch({
      type: 'GET_ALL',
      data: ml
    })
  }
}


export const addMovie = (movie) => {
  return async dispatch => {
    try {
      const response = await movieService.addMovie(movie)

      console.log('new Movie added:', response)
      dispatch({
        type: 'ADD',
        data: response
      })
      dispatch(setNotification(`added a movie - ${movie.Name} - successfully.`, 'success', 7))

      dispatch(getAll()) // need better method
    } catch (error) {
      console.log('fail', error)
      dispatch(setNotification(`failed to save a movie. << ${error.response.data.message} >>`, 'error', 7))
    }
  }
}


export const editMovie = (movie, id) => {
  return async dispatch => {
    try {
      const newMovie = await movieService.editMovie(movie, id)
      console.log('Movie edited:', newMovie)
      dispatch({
        type: 'EDIT',
        data: newMovie
      })
      dispatch(setNotification(`edited a movie - ${movie.Name} - successfully.`, 'success', 7))
      dispatch(getAll()) // need better method
    } catch (error) {
      console.log('fail', error)
      dispatch(setNotification(`failed to edit a movie. << ${error.response.data.message} >>`, 'error', 7))
    }
  }
}

export const addViewing = (viewing, id) => {
  return async dispatch => {
    try {
      const newWatch = await movieService.addViewing(viewing, id)
      console.log('Watch added', newWatch)
      dispatch({
        type: 'ADD_VIEWING',
        data: newWatch
      })
      dispatch(setNotification(`Added a viewing for a movie << >>`, 'success', 7))
      dispatch(getAll())
    } catch (error) {
      console.log('fail', error)
      dispatch(setNotification(`failed to add a viewing. << ${error.response.data.message} >>`, 'error', 7))
    }
  }
}

const movieReducer = (state = null, action) => {

  switch (action.type) {
    case 'GET_ALL':
      return action.data
    case 'ADD':
      //return [...state, action.data]
      return state
    case 'EDIT':
      //return state.map(movie => movie.Id !== action.data.Id ? movie : action.data)
      return state
    case 'DELETE':
      return state.filter(a => a.id !== action.data.id)
    case 'ADD_VIEWING':
      return state
    case 'COMMENT':
      return state.map(movie => movie.id !== action.data.id ? movie : action.data)
    default:
      return state
  }
}

export default movieReducer




const sortWatches = list => {
  var sortedList = list
  for (var i = 1; i < sortedList.length; i++) {
    for (var j = i; j > 0; j--) {
      if (list[j - 1].Date < list[j].Date) {
        var hj = sortedList[j - 1]
        sortedList[j - 1] = sortedList[j]
        sortedList[j] = hj
      }
    }
  }
  return sortedList
}
/*
const getMovies = async () => {
  try {
    const movies = await movieService.getAll()
    console.log('movies', movies)
    movies != null && (
      setMovies(movies.map(m => {
        if (m.Watches !== null) {
          m.Watches = sortWatches(m.Watches)
          // m.LastViewing = new Date(m.Watches[m.Watches.length - 1].Date).getTime()
          m.LastViewing = new Date(m.Watches[0].Date).getTime()
          m.Watchtimes = m.Watches.length
        } else {
          m.LastViewing = null
          if (m.Watches !== null) m.Watchtimes = m.Watches.length
        }
        return m
      })
      )
    )
    //setLoading(false)
  } catch (e) {
    console.log('error: ', e)
  }
}
 */