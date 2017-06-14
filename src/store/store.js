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
  banner: {},
  version: ''
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
    ]
  },
  mutations: {
    SAVE_ITEM (state, item) {
      state.item = {
        id: null,
        type: item.type,
        timestamp: '',
        title: item.title,
        url: state.item.url,
        description: item.description,
        device: item.device,
        banner: {...item.banner},
        version: ''
      }
    },
    SET_ITEM (state, item) {
      state.item = {
        id: item.id,
        type: item.type,
        timestamp: item.timestamp,
        title: item.title,
        url: item.url,
        description: item.description,
        device: {...item.device},
        banner: {
          source: item.full_image,
          img: ''
        },
        version: item.latest_version
      }
    },
    SET_URL (state, url) {
      state.item.url = url
    }
  },
  actions: {
    checkUrl ({commit, state}, url) {
      commit('SET_URL', url)

      instance
      .get('/pending/check', {params: {url: state.item.url}, timeout: 3000})
      .then((response) => {
        let check = response.data
        if (check.exists) {
          commit('SET_ITEM', check.item)

          if (check.live && check.reusable) {
            // if reusable and live redirect to page to bump version
          } else if (check.live && !check.reusable) {
            // if not reusable and live redirect to show page, option to add new URL
          } else {
            // if not live redirect to page to upvote
          }
        } else {
        }
      })
    },
    saveItem ({commit, state}, item) {
      commit('SAVE_ITEM', item)
    },
    setItem ({commit}, type, id) {
      instance.get(`${type}`, {params: {detailId: type}}).then((response) => {
        commit('SET_ITEM', response)
      })
    }
  },
  getters: {
    item: state => state.item,
    types: state => state.types
  },
  strict: debug
})
