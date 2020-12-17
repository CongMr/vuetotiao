/**
 * 本地存储封装模块
 */


export const getItem = userToken =>{
  const data = window.localStorage.getItem(userToken)
  try {
    return JSON.parse(data)
  }catch (err){
    return userToken
  }
}

export const setItem = (userToken, value) =>{
  //如果value是对象，就把value转为json字符串再存储
  if (typeof value === 'object'){
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(userToken,value)
}

export const removeItem = userToken =>{
  window.localStorage.removeItem(userToken)
}