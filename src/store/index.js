import Vue from 'vue'
import Vuex from 'vuex'
import { getItem ,setItem} from "@/utils/storage";

Vue.use(Vuex)

const USER_KEY = 'userToken' //存储token的名称

export default new Vuex.Store({
  state: {
    userToken: getItem(USER_KEY) ,//当前用户登陆状态 （token）
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser( state, data) {
      state.userToken = data
      //为了页面刷新 token数据丢失，token本地存储 达到持久化
      setItem(USER_KEY,state.userToken)
    },

    //添加缓存页面
    addCachePages(state, pagesname){
      if (!this.state.cachePages.includes(pagesname)){
        state.cachePages.push(pagesname)
      }
    },

    //移除缓存页面
    delCachePages(state, pagesname){
      const index = this.state.cachePages.indexOf(pagesname)
      if (index !== -1){
        state.cachePages.splice(index,1)
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
