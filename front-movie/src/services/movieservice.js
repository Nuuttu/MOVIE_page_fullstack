import React from "react";
import axios from "axios";

const baseUrl = 'http://localhost:10000'

const getAll = async () => {
  const response = await axios.get(baseUrl + '/movies')
  console.log('request', response.data)
  // return response.then(response => response.data)
  return response.data
}

const addMovie = async (movie) => {
  console.log('adding movie')
  const headers = {
    'Content-Type': 'application/json'
  };
  const response = await axios.post(baseUrl + '/movies/add', movie, headers)

  return response.data
}

const movieService = { getAll, addMovie }

export default movieService