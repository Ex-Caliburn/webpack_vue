// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import store from './store/'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

// import MintUI from 'mint-ui'
import {Button, Cell} from 'mint-ui'
import 'mint-ui/lib/style.css'

import './config/rem';    // 适配

Vue.component(Cell.name, Cell);


// Vue.use(MintUI)
Vue.use(iView);
Vue.config.productionTip = false

Vue.prototype.$http = Axios

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

app.$Message.config({top: 300, duration: 1.5})

export {app}
