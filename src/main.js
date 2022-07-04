import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Base64 from './assets/js/base64'
import VueAMap from 'vue-amap'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/display.css'
import store from './store'
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs //可以全局使用dayjs
Vue.use(VueAMap)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$Base64 = Base64
// Vue.prototype.HOST = 'http://localhost:4000'
// Vue.prototype.$axios  = axios

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'a1b0236bbdc982373ca4c331d9d944f0',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})
// axios.defaults.baseURL = 'http://localhost:3000/';
router.beforeEach((to, from, next) => {
  console.log('from:', from)
  console.log('to:', to)
  document.title = `${to.meta.title} | backstage`
  // const role = localStorage.getItem('ms_username');
  const authority = localStorage.getItem('authority')
  const token = localStorage.getItem('token')
  console.log(authority)
  if (!token && to.path !== '/login' && to.path !== '/register') {
    next('/')
  } else if (to.meta.Auth) {
    authority ? next() : next('403')
  } else {
    next()
  }
})
