import axios from 'axios'

export const customerChannel = axios.create({
  baseURL: 'http://localhost:5048/'
})