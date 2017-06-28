// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import store from './store/store'
import { routes } from './router'
import './styles/styles.scss'
import { sync } from 'vuex-router-sync'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  store.commit('SET_ERRORS', {})
  next()
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
