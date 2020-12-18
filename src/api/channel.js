/**
 * 频道相关请求模块
 */

import request from "@/utils/request";

/**
 *  获取所有频道列表
 */

export const getAllchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
}

/**
 *  添加频道列表
 */

export const getAddchannels = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

/**
 *  删除频道列表
 */

export const getDelchannels = channelid => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelid}`,
  })
}