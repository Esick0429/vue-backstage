import axios from "axios";
//请求拦截器

const service = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});

service.interceptors.request.use(
  function (config) {
    //判断如果不是登录页，必须携带token到后端，才能正常返回数据

    //判断如果不是login页，获取token,并通过请求头携带到后端
    if (config.url !== 'login' || localStorage.getItem("token")) {
      const token = localStorage.getItem('token');

      //设置请求头
      config.headers.Authorization = token;

    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default service;
