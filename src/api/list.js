/**
 * 详情相关请求模块
 */

import request from "@/utils/request";


/**
 *  获取文章详情
 */

export const getList = article_id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`,
  })
}

/**
 *  获取关注用户
 */

export const getFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings/',
    data: {
      target:userId
    }
  })
}


/**
 *  获取取消关注用户
 */

export const getDelFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`,
  })
}

/**
 *  点击收藏文章
 */

export const AddStar = art_id => {
  return request({
    method: 'POST',
    url:'/app/v1_0/article/collections',
    data:{
      target:art_id
    }
  })
}


/**
 *  点击取消收藏文章
 */

export const DelStar = art_id => {
  return request({
    method: 'DELETE',
    url:`/app/v1_0/article/collections/${art_id}`,
  })
}

/**
 *  文章点赞
 */

export const AddLink = art_id => {
  return request({
    method: 'POST',
    url:'/app/v1_0/article/likings',
    data:{
      target:art_id
    }
  })
}


/**
 *  取消文章点赞
 */

export const DelLink = art_id => {
  return request({
    method: 'DELETE',
    url:`/app/v1_0/article/likings/${art_id}`,
  })
}















