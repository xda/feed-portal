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
      instance.get('/pending/check', {params: {url: url}})
              .then((response) => {
                let check = response.data
                if (check.exists) {
                  console.log('exists')
                  // if not live redirect to page to upvote
                  // if reusable and live redirect to page to bump version
                  // if not reusable and live redirect to show page, option to add new URL
                } else {
                  this.$router.push({name: 'add-item'})
                  console.log(response)
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
