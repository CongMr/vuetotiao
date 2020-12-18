<template>
  <div class="search-results">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad" >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchList} from "@/api/search";

export default {
name: "SearchResults",
  props:{
    searchtext: {
      type:String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1, //页码
      perPage:10 //每页展示多少条数据
    };
  },
  methods: {
    async onLoad() {
      const {data} = await getSearchList({
        page:this.page,
        per_page:this.perPage,
        q:this.searchtext
      })

      const {results} = data.data
      console.log(results)
      this.list.push(...results)

      this.loading = false

      //判断是否还有数据
      if(results.length){
        //如果有,则更新下一条数据
        this.page++
      }else {
        this.finished = true
      }
    },

  },

}
</script>

<style scoped lang="less">
.search-results{
  overflow-y: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
}
</style>