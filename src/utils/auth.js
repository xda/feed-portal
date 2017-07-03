
import store from '../store/store'

import instance from './api'

const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.BASE_URL

export function login () {
  window.location = `https://api.xda-developers.com/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
}

export function logout () {
  localStorage.removeItem('USER_ACCESS_TOKEN')
  store.commit('LOGIN_STATUS', false)
}

export function getParam (param) {
  let match = decodeURIComponent(RegExp('[#&]' + param + '=([^&]*)').exec(window.location.hash)[1].replace(/\+/g, ' '))
  return match
}

export function getAccessToken () {
  let token = getParam('access_token')
  return token
}

export function grabToken () {
  return localStorage.getItem('USER_ACCESS_TOKEN')
}

export function setLoginToken (token) {
  localStorage.setItem('USER_ACCESS_TOKEN', token)
}

export function checkLogin () {
  if (grabToken()) {
    store.commit('LOGIN_STATUS', true)
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
  instance.post('/auth/convert-token', data).then(response => {
    setLoginToken(response.data.access_token)
    console.log(response)
  }).then(checkLogin()).catch(err => {
    console.log(err)
    store.commit('LOGIN_STATUS', false)
  })
}
