import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// const logintwo = () =>import('../components/logintest.vue')
const join = () =>import('../components/join.vue')
const register = () => import('../components/Register.vue')
const Home = () => import('../components/common/Home.vue')
const First = () => import('../views/First.vue')
const Jzc = () => import('../views/Jzc.vue')
const Cc = () => import('../views/Cc.vue')
const Yc = () => import('../views/Yc.vue')
const Xc = () => import('../views/Xc.vue')
const Login = () =>import('../components/Login.vue')
const From = () =>import('../views/From.vue')
const Miss = () =>import('../views/500.vue')
const Miss2 = () =>import('../views/404.vue')
const Miss3 = () =>import('../views/403.vue')
const ditu = () =>import('../views/ditu.vue')
const Music = () =>import('../views/Music.vue')
const Permission = () =>import('../views/Permission.vue')
// const Upload = () =>import('../views/Upload.vue')
Vue.use(VueRouter)

const routes = [
  {
      path:'',
      redirect:'/login'
  },
  {
    path:'/register',
    component: register,
  },
  {
    path:'/login',
    component: Login,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/home/:info',
    name:'Home',
    component: Home,
    children:[
      {
        path:'',
        redirect:'/home/rc',
      },
      {
          path:'rc',
          name:'rc',
          component: First,
          meta:{
            title:'日常行程',
            hideclose:true
          }
      },
      {
          path:'jzc',
          component: Jzc,
          meta:{
            title:'江浙菜',
          }
      },
      {
          path:'xc',
          component: Xc,
          meta:{
            title:'湘菜',
          }
      },
      {
          path:'cc',
          component: Cc,
          meta:{
            title:'川菜',
          }
      },
      {
          path:'Yc',
          component: Yc,
          meta:{
            title:'粤菜',
          }
      },
      {
          path:'from',
          component:From,
          meta:{
            title:'表单'
          }
      },
      {
        path:'500',
        component: Miss,
        meta:{
          title:'500'
        }
      },
      {
        path:'404',
        component: Miss2,
        meta:{
          title:'404'
        }
      },
      {
        path:'403',
        component: Miss3,
        meta:{
        title:'403',
        }
      },
      {
        path:'Permission',
        component: Permission,
        meta:{
          title:'权限测试',
          Auth:true
        }
      },
      {
        path:'ditu',
        component: ditu,
        meta:{
          title:'地图'
        }
      },
      {
        path:'Music',
        component:Music,
        meta:{
          title:'盗版云音乐'
        }
      },
      {
        path: '*',
        redirect: '404'
    }
      // {
      //     path:'from',
      //     component:From,
      //     meta:{
      //       title:'表单'
      //     }
      // }
      // {
      //     path:'Upload',
      //     component:Upload
      // }
    ]
  },
]

const router = new VueRouter({
  routes,
  // mode:'history',
  // base:'/dist'
})

export default router
