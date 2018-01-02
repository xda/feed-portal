import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem('ITEM', JSON.stringify(state.item))
    window.localStorage.setItem('DEVICES', JSON.stringify(state.devices))
  })
}

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const initialItem = {
  id: null,
  type: null,
  timestamp: '',
  title: '',
  url: '',
  description: '',
  device: '',
  deviceSpecific: false,
  banner: {},
  version: '',
  status: {
    exists: false,
    partial: false,
    live: false,
    reusable: false
  },
  devices: [],
  checked: false
}

export default new Vuex.Store({
  state: {
    loading: false,
    instance: null,
    redirect: window.location.hash.substring(0, 13) === '#access_token',
    item: JSON.parse(localStorage.getItem('ITEM')) || {...initialItem},
    types: [
      { name: 'Article', tag: 'article', id: 0 },
      { name: 'Thread', tag: 'thread', id: 1 },
      { name: 'Wallpaper', tag: 'wallpaper', id: 2 },
      { name: 'Homescreen', tag: 'homescreen', id: 3 },
      { name: 'ROM', tag: 'rom', id: 4 },
      { name: 'Kernel', tag: 'kernel', id: 5 },
      // Screenshot: 6
      { name: 'Icon Pack', tag: 'iconpack', id: 7 },
      { name: 'Theme', tag: 'theme', id: 8 },
      { name: 'App', tag: 'app', id: 9 },
      { name: 'Video', tag: 'video', id: 10 }
    ],
    devices: JSON.parse(localStorage.getItem('DEVICES')) || [],
    errors: {},
    thanks: 'Thanks buddy',
    user: {
      isLoggedIn: false
    }
  },
  mutations: {
    CLEAR_REDIRECT (state) {
      // because window location lookup isn't reactive :(
      state.redirect = false
    },
    TOGGLE_LOADING (state, bool) {
      state.loading = bool
    },
    SET_INSTANCE (state, token) {
      state.instance = axios.create({
        baseURL: process.env.BASE_URL + '/',
        timeout: 6000,
        headers: {'Authorization': `Bearer ${token}`}
      })
    },
    SET_ITEM (state, payload) {
      let item = payload.item
      let status = payload.status

      state.item = {
        id: item.id,
        type: item.type,
        timestamp: item.timestamp,
        title: item.title,
        url: item.url,
        uuid: item.uuid,
        description: item.description,
        device: {...item.device},
        deviceSpecific: !!item.device,
        banner: {
          source: '',
          img: item.full_image
        },
        version: item.latest_version,
        status: status
      }
      localStorage.setItem('ITEM', JSON.stringify({...state.item}))
    },
    SET_DEVICES (state, devices) {
      state.devices = devices
      localStorage.setItem('DEVICES', JSON.stringify(devices))
    },
    SET_URL (state, url) {
      state.item.url = url
    },
    SET_ERRORS (state, errors) {
      state.errors = {...errors}
    },
    UPDATE_VERSION (state, version) {
      state.item.version = version
    },
    LOGIN_STATUS (state, status) {
      state.user.isLoggedIn = status
    },
    THANKS (state, message) {
      state.thanks = message
    }
  },
  actions: {
    login ({commit}) {
      commit('LOGIN_STATUS', true)
      commit('SET_INSTANCE', localStorage.getItem('USER_ACCESS_TOKEN'))
    },
    logout ({commit}) {
      commit('LOGIN_STATUS', false)
      commit('SET_INSTANCE', null)
    },
    fetchDevices ({state, commit, dispatch}) {
      state.instance.get('/device/list').then(response => {
        commit('SET_DEVICES', response.data)
      }).catch((err) => {
        console.log(err)
        dispatch('setErrors', err)
      })
    },
    fetchItem ({state, commit, dispatch}, params) {
      dispatch('setErrors', [])
      return state.instance.get('/pending/check', {params: params, timeout: 3000})
      .then((response) => {
        let check = response.data
        if (check.exists) {
          dispatch('setItem',
            {
              item: check.item,
              status: {
                exists: check.exists,
                partial: check.partial,
                reusable: check.reusable,
                live: check.live
              }
            }
          )
        } else {
          dispatch('fetchDevices')
        }
      }).catch((err) => {
        dispatch('setErrors', err)
        dispatch('clearItem')
        console.log(err)
      })
    },
    saveItem ({commit, dispatch, state}, item) {
      let fd = new FormData()

      fd.append('url', item.url)
      fd.append('title', item.title)
      fd.append('description', item.description)
      fd.append('type', item.type)
      fd.append('latest_version', item.version || '')
      fd.append('device_specific', item.deviceSpecific)
      fd.append('device', item.device)

      // only post new pictures
      if (item.banner &&
          item.banner.img &&
          item.banner.img.substring(0, 4) !== 'http') {
        fd.append('full_image', item.banner.file)
      }
      state.instance.post('/pending/create', fd).then((response) => {
        let thanksMessage = `Thanks for suggesting content to XDA Feed, ${item.title}
                             and any other suggestions help to make the app even
                             better for everyone. Keep an eye out for ${item.title}
                             in the app!`
        commit('THANKS', thanksMessage)
        dispatch('setErrors', {}).then(() => {
          dispatch('clearItem')
        })
      }).catch(err => {
        dispatch('setErrors', err)
        commit('THANKS', `Thanks for trying, but this didn't work because:
                          ${err.response.data.error}`)
        console.log(err)
      })
    },
    setItem ({commit}, {item, status, checked}) {
      commit('SET_ITEM', {item: item, status: status})
    },
    setErrors ({commit}, err) {
      commit('SET_ERRORS', err)
    },
    updateVersion ({commit}, version) {
      commit('UPDATE_VERSION', version)
    },
    clearItem ({commit}) {
      commit('SET_ITEM', { item: initialItem, status: initialItem.status })
      localStorage.removeItem('ITEM')
    },
    voteForIt ({commit, dispatch, state}, url) {
      let fd = new FormData()
      fd.append('url', url)
      state.instance.post('/pending/vote', fd).then((response) => {
        let thanksMessage = `Thank you for voting for ${state.item.title},
                             the more votes it gets the more likely it is to
                             go live.
                             Keep an eye out for it in the XDA Feed app!`
        commit('THANKS', thanksMessage)
        dispatch('setErrors', {}).then(() => {
          dispatch('clearItem')
        })
      }).catch(err => {
        dispatch('setErrors', err)
        console.log(err)
      })
    }
  },
  getters: {
    instance: state => state.instance,
    redirect: state => state.redirect,
    loading: state => state.loading,
    item: state => state.item,
    url: state => state.item.url,
    types: state => state.types,
    errors: state => state.errors,
    devices: state => state.devices,
    status: state => state.item.status,
    thanks: state => state.thanks,
    user: state => state.user
  },
  plugins: [localStoragePlugin],
  strict: debug
})
