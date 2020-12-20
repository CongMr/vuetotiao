import Vue from 'vue'
import VueRouter from 'vue-router'
import {Dialog} from "vant";

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
        component: () => import('@/views/home'),
        meta:{requiresAuth:false}
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta:{requiresAuth:false}
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta:{requiresAuth:false}
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
    component: () => import('@/views/login'),
    meta:{requiresAuth:false}
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta:{requiresAuth:false}
  },
  {
    path: '/list/:listId',
    name: 'list',
    component: () => import('@/views/list'),
    meta:{requiresAuth:true},
    //也可以用props来传参
    props:true
  },
  {
    path: '/useredit',
    name: 'useredit',
    component: () => import('@/views/useredit')
  },
]

const router = new VueRouter({
  routes
})

//to:要访问的路由页面信息
//from：来自哪个页面的路由信息
//next:放行的标记
router.beforeEach((to,from,next) =>{
  if (to.meta.requiresAuth){
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登陆才能访问，确认登陆吗？',
    }).then(() => {
      // 确认执行这里
     router.replace('/login')
    }).catch(()=>{
      //取消执行这里
      next(false) //取消了。中断路由导航
    })
  }else {
    //不需要登陆的页面，直接过去
    next()
  }
})

export default router
