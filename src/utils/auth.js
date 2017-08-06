
import store from '../store/store'
import axios from 'axios'

const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.BASE_URL

export function login () {
  window.location = `https://api.xda-developers.com/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
}

export function logout () {
  localStorage.removeItem('USER_ACCESS_TOKEN')
  store.dispatch('logout')
}

export function getParam (param) {
  let match = decodeURIComponent(RegExp('[#&]' + param + '=([^&]*)').exec(window.location.hash)[1].replace(/\+/g, ' '))
  return match
}

export function getAccessToken () {
  let token = getParam('access_token')
  return token
}

export function setLoginToken (token) {
  localStorage.setItem('USER_ACCESS_TOKEN', token)
  store.dispatch('login')
}

export function grabToken () {
  return localStorage.getItem('USER_ACCESS_TOKEN')
}

export function setExpiryDate (expiry) {
  let date = new Date()
  date.setUTCSeconds(expiry)
  localStorage.setItem('EXPIRY_DATE', date)
}

function checkTokenExpiry () {
  let expiryDate = localStorage.getItem('EXPIRY_DATE')
  return Date.parse(expiryDate) > new Date()
}

export function checkLogin () {
  if (grabToken() && checkTokenExpiry()) {
    store.dispatch('login')
  }
}

export function setConvertToken (accessToken) {
  let data = {
    'grant_type': 'convert_token',
    'client_id': process.env.CONVERT_TOKEN_CLIENT_ID,
    'client_secret': process.env.CONVERT_TOKEN_CLIENT_SECRET,
    'backend': 'xda',
    'token': accessToken
  }

  axios.post(process.env.BASE_URL + '/auth/convert-token', data).then(response => {
    setLoginToken(response.data.access_token)
    setExpiryDate(response.data.expires_in)
    console.log(response)
  }).catch(err => {
    console.log(err)
    store.logout()
  })
}
