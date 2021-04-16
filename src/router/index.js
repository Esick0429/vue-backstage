import Vue from 'vue'
import VueRouter from 'vue-router'
const register = () => import(/* webpackChunkName: 'components' */'../components/Register.vue')
const Home = () => import(/* webpackChunkName: 'components' */'../components/common/Home.vue')
const First = () => import(/* webpackChunkName: 'views' */'../views/First.vue')
const Jzc = () => import(/* webpackChunkName: 'views' */'../views/Jzc.vue')
const Cc = () => import(/* webpackChunkName: 'views' */'../views/Cc.vue')
const Yc = () => import(/* webpackChunkName: 'views' */'../views/Yc.vue')
const Xc = () => import(/* webpackChunkName: 'views' */'../views/Xc.vue')
const Login = () =>import(/* webpackChunkName: 'components' */'../components/Login.vue')
const From = () =>import(/* webpackChunkName: 'views' */'../views/From.vue')
const Miss = () =>import(/* webpackChunkName: 'views' */'../views/500.vue')
const Miss2 = () =>import(/* webpackChunkName: 'views' */'../views/404.vue')
const Miss3 = () =>import(/* webpackChunkName: 'views' */'../views/403.vue')
const ditu = () =>import(/* webpackChunkName: 'views' */'../views/ditu.vue')
const Music = () =>import(/* webpackChunkName: 'views' */'../views/Music.vue')
const Permission = () =>import(/* webpackChunkName: 'views' */'../views/Permission.vue')
const Echarts = () =>import(/* webpackChunkName: 'views' */'../views/Echarts.vue')
// const Upload = () =>import('../views/Upload.vue')
Vue.use(VueRouter)

const routes = [
  {
      path:'/',
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
            hideclose:true,
            roles: ['user', 'admin']
          }
      },
      {
          path:'jzc',
          component: Jzc,
          meta:{
            title:'江浙菜',
            roles: ['user', 'admin']
          }
      },
      {
          path:'xc',
          component: Xc,
          meta:{
            title:'湘菜',
            roles: ['user', 'admin']
          }
      },
      {
          path:'cc',
          component: Cc,
          meta:{
            title:'川菜',
            roles: ['user', 'admin']
          }
      },
      {
          path:'Yc',
          component: Yc,
          meta:{
            title:'粤菜',
            roles: ['user', 'admin']
          }
      },
      {
          path:'from',
          component:From,
          meta:{
            title:'表单',
            roles: ['user', 'admin']
          }
      },
      {
        path:'500',
        component: Miss,
        meta:{
          title:'500',
          roles: ['admin'],
        }
      },
      {
        path:'404',
        component: Miss2,
        meta:{
          title:'404',
          roles: ['admin'],
        }
      },
      {
        path:'403',
        component: Miss3,
        meta:{
        title:'403',
        roles: ['admin'],
        }
      },
      {
        path:'Permission',
        component: Permission,
        meta:{
          title:'权限测试',
          Auth:true,
          roles: ['user', 'admin']
        }
      },
      {
        path:'ditu',
        component: ditu,
        meta:{
          title:'地图',
          roles: ['user', 'admin']
          
        }
      },
      {
        path:'Music',
        component:Music,
        meta:{
          title:'盗版云音乐',
          roles: ['user', 'admin']
        }
      },
      {
        path:'Echarts',
        component:Echarts,
        meta:{
          title:'Echarts图表',
          roles: ['user', 'admin']
        }
      },
      {
        path: '*',
        redirect: '404'
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  // mode:'history',
  base:'/dist'
})

export default router
