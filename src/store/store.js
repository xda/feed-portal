import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

var instance = axios.create({
  baseURL: 'https://feed-staging.xda-developers.com/',
  timeout: 1000,
  headers: {'Authorization': 'Bearer 4GDcWT0gqFoUqBHF8MtKEXgndls50b'}
})

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    item: {
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
        item: {
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
      }
      console.log(item)
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
          console.log('exists', url, response)

          commit('SET_ITEM', check.item)

          if (check.live && check.reusable) {
            // if reusable and live redirect to page to bump version
          } else if (check.live && !check.reusable) {
            // if not reusable and live redirect to show page, option to add new URL
          } else {
            // if not live redirect to page to upvote
          }
        } else {
          console.log('false', response)
        }
      })
    },
    saveItem ({commit, state}, item) {
      commit('SAVE_ITEM', item)
    },
    fetchItem () {
      // fetch from API
      // commit(SET_ITEM)
    }
  },
  getters: {
    item: state => state.item
  },
  strict: debug
})
