import Vue from 'vue'
import Router from 'vue-router'
import ListBest from '@/components/ListBest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListBest',
      component: ListBest
    }
  ]
})
