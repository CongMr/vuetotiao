/**
 * 首页相关请求模块
 */

import request from "@/utils/request";


/**
 *  获取用户频道列表
 */

export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels',
  })
}

/**
 *  获取频道新闻列表
 */

export const getChannelsList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}