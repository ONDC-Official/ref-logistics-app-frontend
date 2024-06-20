import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost/api',
  headers: {
    authorization: localStorage.getItem('accessToken') || '',
  },
})

export default instance
