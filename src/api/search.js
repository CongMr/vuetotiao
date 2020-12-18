/**
 * 搜索相关请求模块
 */

import request from "@/utils/request";

/**
 *  获取搜索联想建议
 */

export const getSearch = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params:{
      q //搜索关键词
    }
  })
}


/**
 *  获取搜索列表
 */

export const getSearchList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

/**
 *  获取搜索历史
 */

export const getSearchHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories',
  })
}