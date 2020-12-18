<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button  type="danger" plain round size="mini" class="update-edit" @click="isUpdateShow = !isUpdateShow">
        {{isUpdateShow ? '完成' : '编辑'}}
      </van-button>
    </van-cell>

    <van-grid :gutter="10" >
      <van-grid-item v-for="(channel,index) in userchannel"
         :key="index"
         :text="channel.name"
         :icon="(isUpdateShow && index !== 0) ? 'clear' : ''"
         class="grid-item"
         :class="{active:active === index}"
         @click="onunsetChannel(channel,index)"
      />
    </van-grid>


<!--    频道推荐-->
    <van-cell center :border="false" >
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10"  >
      <van-grid-item v-for="(allchannel,index) in recommendChannels" :key="index" :text="allchannel.name" class="grid-item" @click="addChannel(allchannel)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllchannels,getAddchannels,getDelchannels } from "@/api/channel";

import {mapState} from 'vuex'
import {getItem, setItem} from "@/utils/storage";

export default {
name: "ChannelEdit",
  data(){
    return{
      allchannel:[], //全部频道列表
      isUpdateShow:false //控制编辑的显示状态
    }
  },
  props:{
    userchannel: {
      type: Array,
      required: true
    },
    active:{
      type:Number,
      required: true
    }
  },

  created() {
    this.loadAllChannels()
  },
  computed:{
    ...mapState(['userToken']),
    //推荐频道列表
    recommendChannels(){
      // filter 方法查找满足条件的所以元素
      return this.allchannel.filter(channel =>{
        //判断channel是否属于用户频道    find方法查找满足条件的单个元素
        return !this.userchannel.find(userchannel =>{
          return userchannel.id === channel.id
        })
      })

      // const arr = []
      // this.allchannel.forEach(channel =>{
      //   let flag = false
      //   for (let i=0;i<this.userchannel.length;i++){
      //     if (this.userchannel[i].id === channel.id ){
      //        flag = true
      //        break
      //     }
      //   }
      //   if (!flag){
      //     arr.push(channel)
      //   }
      // })
      // return arr

    }
  },
  methods: {
    //获取全部频道列表
    async loadAllChannels(){
      const {data} = await getAllchannels()
      this.allchannel = data.data.channels
    },

    // 添加我的频道
    async addChannel(channel){
      this.userchannel.push(channel)
      console.log(channel)
      //频道数据持久化,如果用户登陆了，保存到线上
      if (this.userToken){
       await getAddchannels({
          channels:[
            {id: channel.id,seq: this.userchannel.length}
          ]
        })
      }else {
        //如果用户没有登陆，保存到本地
        setItem('user-channel',this.userchannel)
      }
    },

    //如果是编辑状态，就删除频道，如果是为编辑状态，跳转到该频道页面
    onunsetChannel(channel,index){
      if (this.isUpdateShow && index !== 0){
        //编辑状态，删除频道
        this.delChannel(channel,index)
      }else {
        //非编辑状态，切换频道
        this.jumpChannel(index)
      }
    },

    //删除频道
    async delChannel(channel,index){
      if (index <= this.active){
        this.$emit('updateactive',this.active-1)
      }
      this.userchannel.splice(index,1)

      //删除频道数据持久化,如果用户登陆了，保存到线上
      if (this.userToken){
        await getDelchannels(channel.id)
      }else {
        //如果用户没有登陆，保存到本地
        setItem('user-channel',this.userchannel)
      }
    },

    //切换频道
    jumpChannel(index){
      //切换频道
      this.$emit('updateactive',index)
      //关闭弹出层
      this.$emit('close')
    }
  },
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333333;
  }
  .update-edit{
    padding: 0 10px;
  }
  .grid-item{
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content{
      background-color: #f4f5f6;
      position: relative;
      .van-grid-item__text{
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon{
      position: absolute;
      right: -10px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active{
    /deep/.van-grid-item__text{
      color: red !important;
    }

  }
}

</style>