
import VueRouter from 'vue-router'
import instance from './api'

const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.BASE_URL

const router = new VueRouter({
  mode: 'history'
})

export function login () {
  window.location = `https://api.xda-developers.com/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
}

export function logout () {
  // clearidtoken
  // clearaccesstoken
  router.go('/')
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next()
  }
}

function getParam (param) {
  return decodeURIComponent(RegExp('[#&]'+ param + '=([^&]*)').exec(window.location.hash)[1].replace(/\+/g, ' '))
}

export function getAccessToken () {
  return token = getParam('access_token')
}

// TODO:
// in component:
// const promise = new Promise((resolve, reject) => {
//   resolve(getAccessToken())
// }).then(r => setConvertToken(r))

export function getToken() {
  // get user's access token if it's thurr
  return localStorage.getItem(USER_ACCESS_TOKEN)
}

export function setConvertToken (access_token) {
  let data = {
    "grant_type": "convert_token",
    "client_id":"afenj61ioukD5owZuWvnhBDFPmZdtZu0qNzQKm3T",
    "client_secret":"TLMy1NkNI81mvR7PSctBCFrKyo6ta28b4eR5m7YXbeg7379Ena9EAVhhpvZ7wRXAVrh5lDiASnmcxav2OuMtzmizBO3P5z1fOPNVhFLXKz41WsiG25lBcZAjQ4sziwni",
    "backend": "xda",
    "token": access_token
  }

  instance.post('/auth/convert-token', data).then(response => {
    console.log(response)
  }).catch(err => console.log(err))
}
