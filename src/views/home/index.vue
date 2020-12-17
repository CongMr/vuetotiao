<template>
  <div class="home-container">
    <!--    导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button slot="title"  icon="search" type="info"  round size="small" class="search-btn" >搜索</van-button>
    </van-nav-bar>
<!--    文章频道列表-->
    <van-tabs v-model="active" class="channels-tabs">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
<!--        文章列表-->
        <articel-list :channel = "channel"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticelList from "@/views/home/components/ArticelList";
import {getChannels} from "@/api/home";

export default {
  name: "HomeIndex",
  components:{
    ArticelList
  },
  data() {
    return {
      active: 0,
      channels: [] //频道列表
    };
  },
  created() {
    //获取当前用户文章列表
    this.loadChannels()
  },
  methods:{
    async loadChannels(){
      const {data} = await getChannels()
      // console.log(data)
      this.channels = data.data.channels;
    }
  }
}
</script>

<style scoped lang="less">

.home-container{
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-icon{
      font-size: 16px;
    }
    .van-button__text{
      font-size: 14px;
    }
  }

  .channels-tabs{
    /deep/ .van-tab{
      border-right: 1px solid #ededed;
      border-bottom: 1px solid  #ededed;
    }
    /deep/ .van-tabs__line{
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}
</style>