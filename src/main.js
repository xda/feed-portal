// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import store from './store/store'

import { routes } from './router'
import { sync } from 'vuex-router-sync'
import {checkLogin} from './utils/auth'

import './styles/styles.scss'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  store.commit('SET_ERRORS', {})
  checkLogin()
  if (store.getters.user.isLoggedIn || to.name === 'get-feed') {
    next()
  } else {
    next({name: 'get-feed'})
  }
})

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#application',
  router,
  store,
  template: '<App/>',
  components: { App }
})
