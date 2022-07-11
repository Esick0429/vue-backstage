import Vue from 'vue'
import VueRouter from 'vue-router'
const register = () => import(/* webpackChunkName: 'components' */ '../components/Register.vue')
const Home = () => import(/* webpackChunkName: 'components' */ '../components/layout/Home.vue')
const Diary = () => import(/* webpackChunkName: 'views' */ '../views/Diary.vue')
const Blog = () => import(/* webpackChunkName: 'views' */ '../views/blog/Blog.vue')
const Tags = () => import(/* webpackChunkName: 'views' */ '../views/blog/Tags.vue')
const Login = () => import(/* webpackChunkName: 'components' */ '../components/Login.vue')
const Gallery = () => import(/* webpackChunkName: 'views' */ '../views/Gallery.vue')
const From = () => import(/* webpackChunkName: 'views' */ '../views/From.vue')
const Miss = () => import(/* webpackChunkName: 'views' */ '../views/500.vue')
const Miss2 = () => import(/* webpackChunkName: 'views' */ '../views/404.vue')
const Miss3 = () => import(/* webpackChunkName: 'views' */ '../views/403.vue')
const ditu = () => import(/* webpackChunkName: 'views' */ '../views/ditu.vue')
const Music = () => import(/* webpackChunkName: 'views' */ '../views/Music.vue')
const Permission = () => import(/* webpackChunkName: 'views' */ '../views/Permission.vue')
const Echarts = () => import(/* webpackChunkName: 'views' */ '../views/Echarts.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/home/rc'
      },
      {
        path: 'rc',
        name: 'rc',
        component: Diary,
        meta: {
          title: '日记',
          hideclose: true
        }
      },
      {
        path: 'blog',
        name: 'blog',
        component: Blog,
        meta: {
          title: 'blog',
          // hideclose: true,
          Auth: true
        }
      },
      {
        path: 'blog/tags',
        name: 'tags',
        component: Tags,
        meta: {
          title: 'tags',
          // hideclose: true,
          Auth: true
        }
      },
      {
        path: 'from',
        component: From,
        meta: {
          title: '表单'
        }
      },
      {
        path: '500',
        component: Miss,
        meta: {
          title: '500'
        }
      },
      {
        path: '404',
        component: Miss2,
        meta: {
          title: '404'
        }
      },
      {
        path: '403',
        component: Miss3,
        meta: {
          title: '403'
        }
      },
      {
        path: 'Permission',
        component: Permission,
        meta: {
          title: '权限测试',
          Auth: true
        }
      },
      {
        path: 'ditu',
        component: ditu,
        meta: {
          title: '地图'
        }
      },
      {
        path: 'Music',
        component: Music,
        meta: {
          title: '盗版云音乐'
        }
      },
      {
        path: 'Gallery',
        component: Gallery,
        meta: {
          title: '图库'
        }
      },
      {
        path: 'Echarts',
        component: Echarts,
        meta: {
          title: 'Echarts图表'
        }
      },
      {
        path: '*',
        redirect: '404'
      }
    ]
  }
]

const router = new VueRouter({
  routes
  // mode: 'history'
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title ?? ''} | backstage`
  // const role = localStorage.getItem('ms_username');
  const authority = localStorage.getItem('authority')
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login' && to.path !== '/register') {
    next('/')
  } else if (to.meta.Auth) {
    authority ? next() : next('403')
  } else {
    next()
  }
})

export default router
