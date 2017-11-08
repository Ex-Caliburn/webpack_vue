import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import Head from '@/components/head/head'


const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const detail = r => require.ensure([], () => r(require('../page/home/children/detail')), 'detail')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      // redirect: '/login',
      children: [
        {
          path: '/detail',
          name: 'detail',
          component: detail,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/search/:geohash/:id',
      name: "search",
      component: search
    },
    {
      path: '/search/:geohash',
      name: "search1",
      component: search
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition
    // 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    console.log(to, from, savedPosition);
    // return { x: 0, y: 0 }
    window.scrollTo(0, 0);
    // if (savedPosition) {
    //   return { x: 0, y: 0 }
    // } else {
    //   return { x: 0, y: 0 }
    // }
  }
})

export default router


router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  //可以对路由进行效验
  window.scrollTo(0, 0);
  if (true) {
    next();
  } else {
    next(false);
  }
})

// 提醒一下，当使用路由参数时，例如从 /user/foo 导航到 user/bar，原来的组件实例会被复用。
// 因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。


