const initialState = {
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

const mutations = {

}

const getters = {
  url: initialState.url
}

const store = {
  state: initialState,
  mutations: mutations,
  getters: getters
}

export default store
