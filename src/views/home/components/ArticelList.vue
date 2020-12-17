<template>
  <div class="article-list">

<!--    //下拉刷新-->
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="successtitle" :success-duration="1500" >
<!--      上拉刷新-->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <artice-list-item v-for="(articel,index) in articellist" :key="index" :title="articel.title" :articel = "articel"/>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import {getChannelsList} from "@/api/home";
import ArticeListItem from "@/components/ArticelItem/ArticeListItem";
export default {
  name: "ArticelList",
  components:{
    ArticeListItem
  },
  props: {
    channel:{
      type:Object,
      required: true
    }
  },
  data() {
    return {
      articellist: [],
      loading: false,
      finished: false,
      timestamp: null,
      count: 0,
      isRefreshLoading: false,
      successtitle:''
    };
  },
  created() {
  },
  methods:{

    //下拉加载更多
    async onLoad() {
      const { data } = await getChannelsList({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top:1
      })
      // console.log(data)
      const {results} = data.data

      // console.log(results)
      this.articellist.push(...results)
      this.loading = false
      if (results.length){
        this.timestamp = data.data.pre_timestamp
      }else {
        this.finished = true
      }
    },

    // 上拉刷新
    async onRefresh() {
      const { data } = await getChannelsList({
        channel_id: this.channel.id,
        timestamp:  Date.now(), //下拉刷新永远获取最新时间戳
        with_top:1
      })
      const {results} = data.data

      // console.log(results)

      this.articellist.unshift(...results)

      this.isRefreshLoading = false

      this.successtitle = '刷新成功'
    },
  },
}
</script>

<style scoped lang="less">
.article-list{
  overflow-y: auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
}

</style>