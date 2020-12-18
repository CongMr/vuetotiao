<template>
  <div class="search-advice">
<!--    联想建议-->
    <van-cell v-for="(item,index) in advicelist"  :key="index" icon="search"  @click="$emit('search',item)">
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";
import { debounce } from 'lodash'
export default {
name: "SearchAdvice",
  props:{
    searchtext: {
      type:String,
      required: true
    }
  },
  data(){
    return{
      advicelist:[]
    }
  },
  watch: {
    searchtext: {
      // 当数据发生变化则会执行 handler 处理函数
      handler:debounce(async function (){
        const {data} = await getSearch(this.searchtext)
        console.log(data)
       this.advicelist = data.data.options
      },1000),
      immediate:true
    }
  },
  created() {
  },
  methods:{
    highlight(value){
      return value.replace(new RegExp(this.searchtext,'gi'),`<span style="color: red">${this.searchtext}</span>`)
    }
  }
}
</script>

<style scoped>

</style>