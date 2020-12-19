/**
 * 编辑个人资料相关请求模块
 */

import request from "@/utils/request";


/**
 *  获取用户个人资料
 */

export const userEdit = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile',
  })
}

/**
 *  修改用户昵称
 */

export const userUpdatename = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

/**
 *  修改用户性别
 */

export const userUpdatesex = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

/**
 *  修改用户生日
 */

export const userUpdatedate = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}


/**
 *  修改图片
 */

export const userUpdateImg = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}