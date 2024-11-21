import axios from 'axios'
import { enviroments } from '../../config/enviroments'

export const customerChannel = axios.create({
  baseURL: enviroments.VITE_CUSTOMER_API as string
})

export const userChannel = axios.create({
  baseURL: enviroments.VITE_AUTHENTICATION_API as string
})