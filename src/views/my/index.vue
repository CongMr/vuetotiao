<template>
  <div class="my-container">
<!--    已登陆显示这里-->
    <van-cell-group v-if="userToken" class="my-info">
      <van-cell  center class="base-info" :border="false">
        <van-image class="avatar" slot="icon"  round fit="cover" :src="currentUser.photo" />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button size="small" round class="update-btn" to="/useredit">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info mp-4">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item  class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item  class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item  class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

<!--  未登录显示这里    -->
    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img class="mobile" src="./photo.png" alt="">
      </div>
      <div class="text">登陆 / 注册</div>
    </div>



    <van-grid :column-num="2" class="nav-grid">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid-item" icon="browsing-history-o" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mp-4" title="小智同学" is-link to="" />
    <van-cell title="退出登陆" class="logout-cell" v-if="userToken" @click="onLogout"/>
  </div>
</template>

<script>
import {getUser} from "@/api/user";
import { mapState } from 'vuex'


export default {
  name: "MyIndex",
  data(){
    return {
      currentUser:{}
    }
  },
  computed:{
    ...mapState(['userToken'])
  },
  created() {
    this.loadgetUser()
  },
  methods:{
    //获取用户数据
     async loadgetUser(){
        const {data} = await getUser()
        this.currentUser = data.data
        console.log(data)
    },

    //退出登陆
    onLogout(){
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？',
      }).then(() => {  //确认执行这里
          //清楚登陆token
        this.$store.commit('setUser',null)
      }).catch(() => { //退出执行这里
        // on cancel
      });
    }
  }
}
</script>

<style scoped lang="less">
.my-info{
  background: url("./banner.png") no-repeat;
  background-size: cover;
  .base-info{
    box-sizing: border-box;
    height: 115px;
    background-color: unset;
    padding-top: 38px;
    padding-bottom: 11px;
    .avatar{
      width: 66px;
      height: 66px;
      border: 1px solid #fff;
      box-sizing: border-box;
      margin-right: 11px;
    }
    .name{
      font-size: 15px;
      color: #fff;
    }
    .update-btn{
      height: 16px;
      font-size: 10px;
      color: #666666;
    }
  }
  .data-info{
    .data-info-item{
      height: 65px;
      color: #fff;
      .text-wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count{
          font-size: 18px;
        }
        .text{
          font-size: 11px;
        }
      }
    }
  }

   /deep/ .van-grid-item__content{
    background-color: unset;
  }
}

.not-login{
  height: 180px;
  background: url("./banner.png") no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile{
    width: 66px;
    height: 66px;
  }
  .text{
    font-size: 14px;
    color: #fff;
  }
}



/deep/ .nav-grid{
  .nav-grid-item{
    height: 70px;
    .van-grid-item__icon{
      font-size: 22px;
    }
    .van-icon-star-o{
      color:#be5253 ;
    }
    .van-icon-browsing-history-o{
      color:#ff9d1d;
    }
    .van-grid-item__text{
      font-size: 14px;
      color: #333333;
    }
  }

}

.logout-cell{
  text-align: center;
  color: #d86262;
}

.mp-4{
  margin-bottom: 4px;
}
</style>