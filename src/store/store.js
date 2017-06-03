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
    SAVE_ITEM () {

    },
    SET_ITEM () {

    },
    SET_URL (state, url) {
      console.log(url)
      state.item.url = url
    }
  },
  actions: {
    checkUrl (state, url) {
      // check url against APi
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
