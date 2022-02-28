import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css';
import Types from './components/mui'
import Typography from '@mui/material/Typography';

import MovieList from './components/MovieList'
import MovieForm from './components/MovieForm';
//import movieService from './services/movieservice'
import Notification from './components/Notification'

import { getAll } from './reducers/movieReducer'


function App() {
  //const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)


  const dispatch = useDispatch()

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  /* const [loginVisible, setLoginVisible] = useState(false) */

  useEffect(() => {
    dispatch(getAll())
    setLoading(false)
  }, [dispatch])


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p className="App-logo">Tuomo's Movie List</p>
          <Notification />

          {!loading ?
            <div>
              {/* <MovieForm addMovie={addMovie} /> */}
              <MovieForm />
              <MovieList />
            </div>
            :
            <Typography variant='h5'>Cannot find the Movie List :(</Typography>
          }
        </div>
      </header>
      <Types />
    </div>
  );
}

export default App;
