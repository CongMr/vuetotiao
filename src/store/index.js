import Vue from 'vue'
import Vuex from 'vuex'
import { getItem ,setItem} from "@/utils/storage";

Vue.use(Vuex)

const USER_KEY = 'userToken' //存储token的名称

export default new Vuex.Store({
  state: {
    userToken: getItem(USER_KEY) //当前用户登陆状态 （token）
  },
  mutations: {
    setUser( state, data) {
      state.userToken = data
      //为了页面刷新 token数据丢失，token本地存储 达到持久化
      setItem(USER_KEY,state.userToken)
    }
  },
  actions: {
  },
  modules: {
  }
})
