import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由表
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', //默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/list/:listId',
    name: 'list',
    component: () => import('@/views/list'),
    //也可以用props来传参
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
