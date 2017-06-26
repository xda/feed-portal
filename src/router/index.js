import getFeed from '../components/getFeed'
import urlInput from '../components/urlInput'
import addItem from '../components/addItem'
import itemDetails from '../components/itemDetails'
import thanks from '../components/thanks'

import store from '../store/store'

export const routes = [
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
    path: '/:type/:id',
    component: itemDetails,
    props: true
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: thanks,
    beforeEnter: (to, from, next) => {
      if (Object.keys(store.getters.errors).length > 0) {
        next(false)
      } else {
        next()
      }
    }
  }
]
