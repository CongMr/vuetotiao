/**
 * 请求模块
 */

import axios from "axios"
import store from '@/store'
import JSONbig from 'json-bigint'
import {Toast} from "vant";
import router from "@/router";
const resfreshToken = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', //基础路径
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', //基础路径

  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
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
request.interceptors.response.use(function (response) {



  return response
}, async function (error) {
  const status = error.response.status
  if (status === 400){
    //客户端请求参数错误
    Toast.fail('客户端请求参数异常')
  }else if (status === 401){
    //token无效
    const  user = store.state;
    if (!user || !user.token){
      //直接跳转到登陆页
      return redirectLogin()
    }
    //使用refreshtoken获取token
    try {
      const {data} = await resfreshToken({
        method: 'PUT',
        url:'/app/v1_0/authorizations',
        headers:{
          Authorization:`Bearer ${user.refresh_token}`
        }
      })
      //拿到新的token，然后把它更新到vuex中
      user.token = data.data.token
      this.$store.commit('setUser',user)
      //error.config是本次请求的相关配置对象
      return request(error.config)
    }catch (err){
      //刷新token失败，直接跳到登陆页
      redirectLogin()
    }

  }else if (status === 403){
    //没有权限操作
    Toast.fail('没有权限操作')
  }else if (status === 500){
    //服务端异常
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
});


function redirectLogin(){
  router.replace({
    name:'login',
    query:{
      redirect:router.currentRoute.fullPath
    }
  });
}

//导出

export default request