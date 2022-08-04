import axios from 'axios'
import router from '@/router/index'
import { Message } from 'element-ui'
//请求拦截器

const service = axios.create({
  // baseURL: 'http://119.91.27.40:4000',
  baseURL: 'https://api.esick.work/admin',
  timeout: 5000
})

service.interceptors.request.use(
  function (config) {
    //判断如果不是登录页，必须携带token到后端，才能正常返回数据

    //判断如果不是login页，获取token,并通过请求头携带到后端
    if (config.url !== '/api/login' || localStorage.getItem('token')) {
      const token = localStorage.getItem('token')

      //设置请求头
      config.headers['Authorization'] = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  function (response) {
    let { status, msg, data } = response.data
    if (status !== 200) {
      Message.error(msg)
    }
    if (response.data.status === 401) {
      router.replace('/login')
    }

    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default service
