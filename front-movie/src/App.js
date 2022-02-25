import React, { useState, useEffect } from 'react'
import './App.css';
import Types from './components/mui'
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

  const getMovies = async () => {
    try {
      const ml = await movieService.getAll()
      console.log('ml', ml)
      ml != null && (
        setMovies(ml.map(m => {
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
