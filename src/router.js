import Vue from 'vue'
import Router from 'vue-router'

import Top from './components/TopPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Top
    }
  ]
})