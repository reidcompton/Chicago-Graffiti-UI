import Vue from 'vue'
import Router from 'vue-router'
import Graffiti from '@/components/Graffiti'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Graffiti',
      component: Graffiti
    }
  ]
})
