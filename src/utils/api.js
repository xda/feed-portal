import axios from 'axios'
import {grabToken} from './auth'

const instance = axios.create({
  baseURL: process.env.BASE_URL + '/',
  timeout: 6000,
  headers: {'Authorization': `Bearer ${grabToken()}`}
})

export default instance
