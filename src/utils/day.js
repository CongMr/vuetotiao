/**
 *  初始化 dayjs相关配置
 */
import Vue from 'vue'
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import relativeTime  from 'dayjs/plugin/relativeTime'

//配置使用处理相对时间
dayjs.extend(relativeTime)

//配置使用中文语言包
dayjs.locale('zh-cn') // 全局使用


//把处理代码相对时间的代码包装为全局过滤器，然后就可以在任何组件的模板中使用了
Vue.filter('relativeTime',value => {
  return dayjs(value).from(dayjs())
})




