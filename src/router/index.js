import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import Head from '@/components/head/head'


const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: '/login',
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
