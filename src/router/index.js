import getFeed from '../components/getFeed'
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
    path: '/suggest/add',
    name: 'add-item',
    component: addItem
  },
  {
    path: '/suggest/:uuid',
    component: itemDetails,
    beforeEnter: (to, from, next) => {
      if (from.name !== 'get-feed') {
        store.dispatch('fetchItem', to.params).then(() => {
          let item = store.getters.item
          if (item.status.partial) {
            next({name: 'add-item'})
          } else if (item.id === null) {
            next({name: 'get-feed'})
          } else {
            next()
          }
        })
      } else {
        next()
      }
    }
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
  }
]
