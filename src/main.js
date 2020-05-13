import Vue from 'vue'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import router from '@/router'
import App from '@/App'
import axios from 'axios'
import Message from './components/message'

// 给axios配置api根地址
// process.env是全局变量，来源于/config/dev.env.js
// 将axios挂载在所有组件的$axios属性上
axios.defaults.baseURL = process.env.API_ROOT
Vue.prototype.$axios = axios

// Vue.use(ElementUI)
Vue.use(Message)

// store作为选项传入根组件，是将$store注入所有子组件
// 子组件都可以通过this.$store访问全局store
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
