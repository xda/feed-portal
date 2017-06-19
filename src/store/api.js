import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://feed-staging.xda-developers.com/',
  timeout: 6000,
  headers: {'Authorization': 'Bearer 4GDcWT0gqFoUqBHF8MtKEXgndls50b'}
})

export default instance
