import Vue from 'vue'
import Router from 'vue-router'

import Top from './components/TopPage'
import Lesson from './components/LessonPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Top
    },
    {
      path: '/lesson',
      component: Lesson
    }
  ]
})