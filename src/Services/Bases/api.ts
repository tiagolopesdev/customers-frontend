import axios from 'axios'

export const customerChannel = axios.create({
  // baseURL: 'https://minimarket-customer-backend-latest.onrender.com/'
  // baseURL: 'https://customers-backend.onrender.com/'
  baseURL: 'http://localhost:5048/'
})

export const userChannel = axios.create({
  baseURL: 'https://mini-market-authentication.onrender.com/'
  // baseURL: 'http://localhost:5167/'
})