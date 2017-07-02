import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 6000,
  headers: {'Authorization': 'Bearer 4GDcWT0gqFoUqBHF8MtKEXgndls50b'}
})

export default instance
