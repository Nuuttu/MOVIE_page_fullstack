import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Types from './components/mui'
import axios from 'axios';
import Typography from '@mui/material/Typography';

import MovieList from './components/movieList'
import MovieForm from './components/movieForm';
import movieService from './services/movieservice'


function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const addMovie = async (movie) => {

    const newMovie = await movieService.addMovie(movie)
    console.log('new Movie added:', newMovie)

    setTimeout(() => {
      getMovies()
    }, 1000);
  }

  const getMovies = async () => {
    try {
      const ml = await movieService.getAll()
      console.log('ml', ml)
      setMovies(ml.map(m => {
        if (m.Watches !== null) {
          m.LastViewing = new Date(m.Watches[m.Watches.length - 1].Date).getTime()
        } else {
          m.LastViewing = null
        }
        return m
      }))
      setLoading(false)
    } catch (e) {
      console.log('error: ', e)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p className="App-logo">Tuomo's Movie List</p>
          {!loading ?
            <div>
              <MovieForm addMovie={addMovie} />
              <MovieList movies={movies} />
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
