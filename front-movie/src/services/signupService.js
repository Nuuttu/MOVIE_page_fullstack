import axios from 'axios'

//const baseUrl = 'http://localhost:10000'
const baseUrl = process.env.REACT_APP_BASE_URL


const signup = async credentials => {
  const response = await axios.post(`${baseUrl}/signup`, credentials, { withCredentials: true })
  console.log('responser', response)
  return response.data
}

const signupService = { signup }

export default signupService