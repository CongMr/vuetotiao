<template>
  <div class="home-container">
    <!--    导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button slot="title"  icon="search" type="info"  round size="small" class="search-btn" to="search" >搜索</van-button>
    </van-nav-bar>
<!--    文章频道列表-->
    <van-tabs v-model="active" class="channels-tabs">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id" to="">
<!--        文章列表-->
        <articel-list :channel = "channel"/>
      </van-tab>

      <div slot="nav-right" class="layer-hide"></div>
      <div slot="nav-right" @click="isChannelLayer = true" class="wap-layer">
        <van-icon name="wap-nav" />
      </div>

    </van-tabs>

<!--    弹出层-->
    <van-popup v-model="isChannelLayer" position="bottom" round closeable  close-icon-position="top-left" get-container="body" style="height:100%"  class="channel-layer">
      <channel-edit :userchannel = "channels" @close="isChannelLayer = false" @updateactive = "updateactive" :active = "active"/>
    </van-popup>
  </div>
</template>

<script>
import ArticelList from "@/views/home/components/ArticelList";
import ChannelEdit from "@/views/home/components/ChannelEdit";

import {getChannels} from "@/api/home";
import {mapState} from 'vuex'
import {getItem} from "@/utils/storage";

export default {
  name: "HomeIndex",
  components:{
    ArticelList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [], //频道列表
      isChannelLayer: false, //控制弹出层显示或者隐藏
    };
  },
  computed:{
    ...mapState(['userToken'])
  },
  created() {
    //获取当前用户文章列表
    this.loadChannels()
  },
  methods:{
    async loadChannels(){
      // let  channels = []
      //如果用户登陆成功，获取线上频道列表
      if (this.userToken){
        const {data} = await getChannels()
        this.channels = data.data.channels;
      }else {
        //如果没有登陆，判断本地有没有频道数据
        const lacalChanneL = getItem('user-channel')
        //如果本地有，获取本地频道数据
        if (lacalChanneL){
          this.channels = lacalChanneL
        }else {
          //如果本地没有，获取到线上
          const {data} = await getChannels()
          this.channels = data.data.channels;
        }
      }
      // this.channels = channels
    },

    //子组件选择 ，跳转到父组件频道
    updateactive(index){
      this.active = index
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
    .layer-hide{
      width: 33px;
      flex-shrink: 0;
    }
    .wap-layer{
      position: fixed;
      right: 0;
      width: 33px;
      height: 44px;
      line-height: 44px;
      border-left: 1px solid #ccc;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: .9;
      .van-icon{
        font-size: 24px;
      }
    }
  }
}
</style>