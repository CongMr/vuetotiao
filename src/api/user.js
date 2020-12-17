/**
 * 用户相关请求模块
 */

import request from "@/utils/request";
// import store from '@/store'


/**
 *  登陆/注册
 */

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}


/**
 *  获取验证码
 */
export const Code = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}


/**
 *  获取登陆用户信息
 */
export const getUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers:{
    //   Authorization : `Bearer ${store.state.userToken.token}`
    // }
  })
}
