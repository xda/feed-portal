import Vue from 'vue'
import Router from 'vue-router'
import urlInput from '../components/urlInput'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'url-input',
      component: urlInput
    }
  ]
})
