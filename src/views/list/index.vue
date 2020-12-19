<template>
  <div class="list-container">
    <van-nav-bar  class="app-nav-bar" left-arrow @click-left="$router.back()" />

    <div class="article-wrap">
      <h1 class="title">{{contentlist.title}}</h1>
      <van-cell center class="user-info">
        <div  slot="title" class="name">{{ contentlist.aut_name }}</div>
        <van-image slot="icon" class="avatar" round fit="cover"  :src="contentlist.aut_photo" />
        <div slot="label" class="putdate">{{ contentlist.pubdate | relativeTime}}</div>
        <van-button
          :type="contentlist.is_followed ? 'default' :'info'"
          :icon="contentlist.is_followed ? '' : 'plus'"
          round size="small" class="follow-btn"
          :loading="isFollowloading"
          @click="onFollow()"
        >
          {{contentlist.is_followed ? '已关注' : '关注'}}
        </van-button>
      </van-cell>
      <div class="markdown-body" >
        <div v-html="contentlist.content" ref="content-img"></div>
      </div>

      <!--    文章评论-->
      <com-ments :commentid = "listId"/>
      <!--    文章评论-->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small" >写评论</van-button>
      <van-icon name="comment-o" color="#777" />
      <van-icon :color="contentlist.is_collected ? 'orange' : '#777'" :name="contentlist.is_collected ? 'star' : 'star-o'" @click="onStar"/>
      <van-icon :color="contentlist.attitude === 1 ? 'hotpink' : '#777'" :name="contentlist.attitude === 1 ? 'good-job' : 'good-job-o'" @click="onLink"/>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

  </div>
</template>

<script>
import ComMents from "@/views/list/comments/ComMents";
import './mack-down.css'
import {getList, getFollow, getDelFollow, AddStar,DelStar, AddLink, DelLink} from "@/api/list";
import { ImagePreview } from 'vant';
import { Toast,Dialog } from 'vant';
export default {
name: "index",
  components:{
    ComMents
  },
  props:{
   //通过配置路由props  获取的文章详情id
    listId:{
      type:[String,Number,Object],
      required:true
    }
  },
  data(){
    return{
      contentlist:{},
      isFollowloading:false,
    }
  },
  created() {
  //获取文章详情
    this.loadList()
  },
  methods:{
    async loadList(){
      const {data} = await getList(this.listId)
      // console.log(data)
      this.contentlist = data.data

      //图片预览
      this.$nextTick(() => {
          const content = this.$refs['content-img']
        //获取全部img标签
          const content_img = content.querySelectorAll("img")
        // console.log(content_img)
          const imgs = []
        //循环img标签并取出全部的src图片
          content_img.forEach((img,index) =>{
            imgs.push(img.src)
            //给图片添加点击事件
            img.onclick = function (){
              ImagePreview({
                images: imgs,
                startPosition: index,
              });
            }
          })
      })
    },

    //点击关注用户
     onFollow(){
      this.isFollowloading = true
      if (this.contentlist.is_followed){
        //关注用户
       getFollow(this.contentlist.aut_id)
      }else {
        //取消关注
        getDelFollow(this.contentlist.aut_id)
      }
      this.contentlist.is_followed = !this.contentlist.is_followed
       this.isFollowloading = false
    },

    //收藏文章
    async onStar(){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      if (this.contentlist.is_collected){
        //收藏文章
        await DelStar(this.listId)
      }else {
        //取消收藏
        await AddStar(this.listId)
      }
      this.contentlist.is_collected = !this.contentlist.is_collected
      Toast.success(`${this.contentlist.is_collected ? '': '取消'}收藏成功`)
    },

    //点赞文章
    async onLink(){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      if (this.contentlist.attitude === 1){
        //取消点赞
        await DelLink(this.listId)
        this.contentlist.attitude = -1
      }else {
        //点赞文章
        await AddLink(this.listId)
        this.contentlist.attitude = 1
      }
      Toast.success(`${this.contentlist.attitude === 1 ? '': '取消'}点赞成功`)
    },
  }
}
</script>

<style scoped lang="less">
.article-wrap{
  overflow-y: auto;
  position: fixed;
  right: 0;
  left: 0;
  top: 46px;
  bottom: 44px;
}
.title{
  font-size: 22px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info{
  .avatar{
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name{
    font-size: 12px;
    color: #333333;
  }
  .putdate{
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn{
    width: 85px;
    height: 29px;
  }
}
.markdown-body{
  padding: 14px;
  background-color: #fff;
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>