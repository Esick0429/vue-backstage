import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Base64 from './assets/js/base64'
import VueAMap from 'vue-amap';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/display.css';
import store from './store'
Vue.use(VueAxios, axios);
Vue.use(VueAMap);
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$Base64 = Base64;
// Vue.prototype.HOST = 'http://localhost:4000'
// Vue.prototype.$axios  = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'a1b0236bbdc982373ca4c331d9d944f0',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
// axios.defaults.baseURL = 'http://localhost:3000/';

router.beforeEach((to, from, next) => {
  console.log("from:", from);
  console.log("to:", to);
  document.title = `${to.meta.title} | backstage`;
  // const role = sessionStorage.getItem('ms_username');
  const role = sessionStorage.getItem('UserRole')
  const token = sessionStorage.getItem('token')
  console.log(role)
    if (!token && to.path !== '/login' && to.path !== '/register') {
      next('/')
    }else if(to.meta.Auth){
      role === 'admin' ? next() : next('403');
    }else{
      next();
    }
  
})

axios.interceptors.request.use(
  function (config) {
    //判断如果不是登录页，必须携带token到后端，才能正常返回数据

    //判断如果不是login页，获取token,并通过请求头携带到后端
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token');

      //设置请求头
      config.headers['Authorization'] = token;

    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

