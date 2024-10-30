import axios from 'axios'

export const customerChannel = axios.create({
  // baseURL: 'https://customers-backend.onrender.com/'
  baseURL: 'http://localhost:5048/'
})