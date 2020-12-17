/**
 * 请求模块
 */

import axios from "axios"
import store from '@/store'


const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' //基础路径
})

//请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const  user = store.state.userToken;
  // console.log(user)
  // console.log(config)
  if (user){
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
//响应拦截器

//导出

export default request