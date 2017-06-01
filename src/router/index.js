import Vue from 'vue'
import Router from 'vue-router'
import getFeed from '../components/getFeed'
import urlInput from '../components/urlInput'
import addItem from '../components/addItem'
import pendingItem from '../components/pendingItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'get-feed',
      component: getFeed
    },
    {
      path: '/url',
      name: 'url-input',
      component: urlInput
    },
    {
      path: '/add',
      name: 'add-item',
      component: addItem
    },
    {
      path: '/pending',
      name: 'pending-item',
      component: pendingItem
    }
  ]
})
