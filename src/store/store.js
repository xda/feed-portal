import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    item: {
      id: '',
      url: '',
      device: '',
      type: '',
      title: '',
      description: '',
      banner: {
        name: '',
        img: ''
      }
    }
  },
  mutations: {
    SAVE_ITEM (state, item) {
      state.item = {
        id: '',
        url: state.item.url,
        device: item.device,
        type: item.type,
        title: item.title,
        description: item.description,
        banner: {...item.banner}
      }
    },
    SET_ITEM () {

    },
    SET_URL (state, url) {
      state.item.url = url
    }
  },
  actions: {
    checkUrl (state, url) {
      // check url against APi
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
