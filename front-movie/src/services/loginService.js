import axios from 'axios'
const baseUrl = 'http://localhost:10000/signin'

/** 
 * TODO: 
 * Logout handling
 * 
 * 
 * 
 * 
 */




const login = async credentials => {
  const response = await axios.post(baseUrl, credentials, { withCredentials: true })
  console.log('responser', response)
  return response.data
}
/* 
const logout = async token => {
  const response = await axios.post(baseUrl, token, { withCredentials: true })
  console.log('responser', response)
  return response.data
}
 */
export default { login }