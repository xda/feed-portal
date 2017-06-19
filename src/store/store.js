import Vuex from 'vuex'
import Vue from 'vue'
import instance from './api'

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
    live: false,
    reusable: false
  }
}

export default new Vuex.Store({
  state: {
    item: {...initialItem},
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
    devices: []
  },
  mutations: {
    SAVE_ITEM (state, thing) {
      let item = thing
      let fd = new FormData()

      fd.append('url', item.url)
      fd.append('title', item.title)
      fd.append('description', item.description)
      fd.append('type', item.type)
      fd.append('latest_version', item.version)
      fd.append('device_specific', item.deviceSpecific)

      // only post new pictures
      if (item.banner && item.banner.img.substring(0, 4) !== 'http') {
        fd.append('full_image', item.banner.img)
      }

      instance.post('/pending/create', fd).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log('errors', err)
      })
    },
    SET_ITEM (state, payload) {
      console.log(payload)
      let item = payload.item
      let status = payload.status
      state.item = {
        id: item.id,
        type: item.type,
        timestamp: item.timestamp,
        title: item.title,
        url: item.url,
        description: item.description,
        device: {...item.device},
        banner: {
          source: '',
          img: item.full_image
        },
        version: item.latest_version,
        status: status
      }
    },
    SET_DEVICES (state, devices) {
      let array = []
      devices.map((d) => {
        array.push(d.name)
      })
      state.devices = array
    },
    SET_URL (state, url) {
      state.item.url = url
    },
    UPDATE_VERSION (state, version) {
      state.item.version = version
    }
  },
  actions: {
    fetchDevices ({commit}, devices) {
      commit('SET_DEVICES', devices)
    },
    saveItem ({state}, item) {
      let fd = new FormData()

      fd.append('url', item.url)
      fd.append('title', item.title)
      fd.append('description', item.description)
      fd.append('type', item.type)
      fd.append('latest_version', item.version)
      fd.append('device_specific', item.deviceSpecific)

      // only post new pictures
      if (item.banner &&
          item.banner.img &&
          item.banner.img.substring(0, 4) !== 'http') {
        fd.append('full_image', item.banner.file)
      }

      instance.post('/pending/create', fd).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log('errors', err)
      })
    },
    setItem ({commit}, {item, status}) {
      commit('SET_ITEM', {item: item, status: status})
    },
    updateVersion ({commit}, version) {
      commit('UPDATE_VERSION', version)
    },
    clearItem ({commit}) {
      commit('SET_ITEM', {item: initialItem, status: initialItem.status})
    },
    voteForIt ({state}, url) {
      let fd = new FormData()
      fd.append('url', url)
      instance.post('/pending/vote', fd).then((response) => {
        console.log(response)
      }).catch(err => console.log(err))
    }
  },
  getters: {
    item: state => state.item,
    types: state => state.types,
    devices: state => state.devices,
    status: state => state.item.status
  },
  strict: debug
})
