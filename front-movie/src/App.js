import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css';
import Types from './components/mui'
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';

import MovieList from './components/MovieList'
import MovieForm from './components/MovieForm';
//import movieService from './services/movieservice'
import Notification from './components/Notification'

import { getAll } from './reducers/movieReducer'
import { initializeUser } from './reducers/loginReducer'
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';

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
    dispatch(initializeUser())
  }, [dispatch])


  return (
    <div className="App">
      <Toolbar>
        <LoginComponent />
        <SignupComponent />
      </Toolbar>
      <Notification />
      <header className="App-header">
        <div>
          <p className="App-logo">Tuomo's Movie List</p>
          {/* <Notification /> */}


        </div>
      </header>
      <div className="App-body">
        {!loading ?
          <div>
            <MovieForm />
            <MovieList />
          </div>
          :
          <Typography variant='h5'>Cannot find the Movie List :(</Typography>
        }
      </div>
      <Types />
    </div>
  );
}

export default App;
