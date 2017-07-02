import axios from 'axios'

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://feed.xda-developers.com/'
} else {
  baseURL = 'http://feed-staging.xda-developers.com/'
}

const instance = axios.create({
  baseURL: baseURL,
  timeout: 6000,
  headers: {'Authorization': 'Bearer 4GDcWT0gqFoUqBHF8MtKEXgndls50b'}
})

export default instance
