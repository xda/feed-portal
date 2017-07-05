import getFeed from '../components/getFeed'
import addItem from '../components/addItem'
import itemDetails from '../components/itemDetails'
import thanks from '../components/thanks'
import authCallback from '../components/authCallback'

import store from '../store/store'

export const routes = [
  {
    path: '/',
    name: 'get-feed',
    component: getFeed
  },
  {
    path: '/suggest/add',
    name: 'add-item',
    component: addItem
  },
  {
    path: '/suggest/:uuid',
    component: itemDetails
  },
  {
    path: '/suggest/thanks',
    name: 'thanks',
    component: thanks,
    beforeEnter: (to, from, next) => {
      if (Object.keys(store.getters.errors).length > 0) {
        next(false)
      } else {
        next()
      }
    }
  },
  {
    path: '/authCallback',
    component: authCallback
  }
]
