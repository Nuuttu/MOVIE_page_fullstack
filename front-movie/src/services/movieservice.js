import axios from "axios";

//const baseUrl = 'http://localhost:10000'
const baseUrl = process.env.REACT_APP_BASE_URL

const getAll = async () => {
  console.log("baseurl", process.env.REACT_APP_BASE_URL)
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

const editMovie = async (movie, id) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const response = await axios.put(baseUrl + `/movies/${id}/edit`, movie, headers)

  return response.data
}

const addViewing = async (viewing, id) => {
  console.log('adding a viewing')
  const headers = {
    'Content-Type': 'application/json'
  }
  const response = await axios.post(baseUrl + `/movies/${id}/viewing/add`, viewing, headers)

  return response.data
}

const deleteViewing = async (vid, mid) => {
  console.log('deleting a viewing')

  const response = await axios.delete(baseUrl + `/movies/${mid}/viewing/${vid}/delete`)

  return response.data
}

const movieService = { getAll, addMovie, addViewing, editMovie, deleteViewing }

export default movieService