import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



//加载Vant组件库
import Vant from 'vant';

//加载Vant组件库样式
import 'vant/lib/index.css';

//自动设置REM基准值（html标签字体大小）
import 'amfe-flexible'
//加载全局样式
import './styles/index.less'

Vue.use(Vant);

import { Dialog } from 'vant';

import './utils/day'

// 全局注册
Vue.use(Dialog);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
