import axios, { InternalAxiosRequestConfig } from 'axios'
import { enviroments } from '../../config/enviroments'

const paginationIntercept = (config: InternalAxiosRequestConfig<unknown>) => {

  if (config.params) {
    config.params.PageIndex = config.params.PageIndex <= 0 ? 1 : config.params.PageIndex
  }
  
  return config;
}

export const customerChannel = axios.create({
  baseURL: enviroments.VITE_CUSTOMER_API as string,
})

customerChannel.interceptors.request.use(paginationIntercept)

export const userChannel = axios.create({
  baseURL: enviroments.VITE_AUTHENTICATION_API as string
})