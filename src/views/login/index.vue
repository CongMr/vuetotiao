<template>
  <div class="login-container">
<!--    导航栏-->
    <van-nav-bar title="注册/登陆" class="app-nav-bar" left-arrow @click-left="$router.back()" />
    <!--    登陆表单-->
    <van-form @submit="onLogin" @failed="onFailed" validate-first :show-error="false" :show-error-message="false" ref="login-form">
      <van-field v-model="user.mobile" icon-prefix="toutiao" left-icon="shouji" name="mobile" center placeholder="请输入手机号" :rules="formRules.mobile"/>
      <van-field v-model="user.code" clearable icon-prefix="toutiao" left-icon="yanzhengma" name="code" center placeholder="请输入验证码"  :rules="formRules.code">
        <template #button>
          <van-count-down :time="1000 * 60" v-if="isCountDownShow" format="ss s" @finish="isCountDownShow = false"/>
          <van-button size="mini" class="send-btn"  v-else round @click.prevent="Sendcode" :loading="isSendLoading">发送验证码</van-button>
        </template>
      </van-field>
      <!--    登陆按钮-->
      <div class="login-btn-wrap">
        <van-button type="info" class="login-btn" block >登陆</van-button>
      </div>
    </van-form>


  </div>
</template>

<script>

import {login,Code} from "@/api/user";
import { Toast } from 'vant';

export default {
  name: "LoginIndex",
  data() {
    return {
      user:{
        // mobile:'13922222222', //手机号
        mobile: '17090086870',
        code: '246810' //验证码
      },
      formRules:{
        mobile:[
          { required: true, message: '请输入手机号' },
          {pattern: /^1[3|5|7|8|9|]\d{9}$/,message: '手机号错误'}
        ],
        code:[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/,message: '验证码错误'}
        ]
      },
      isCountDownShow: false,
      isSendLoading: false
    }
  },
  methods:{
    //获取验证码
    async Sendcode(){
      try {
        await this.$refs['login-form'].validate('mobile')

        this.isSendLoading=true //防止多次点击，多次发送
        //验证通过，请求发送验证码
        // console.log(this.user.mobile)
        const res = await Code(this.user.mobile)
        console.log(res)

        //显示短信倒计时
        this.isCountDownShow= true
      }catch (err){
        let message=''
        if(err && err.message && err.response.status === 429){
          message = '发送太频繁了，请稍后重试'
        }else if (err.name === 'mobile'){
          message = err.message
        }else {
          message = '发送失败,请稍后重试'
        }
        console.log(err)
        Toast({
          message,
          position: 'top'
        })
      }
      this.isSendLoading=false
    },

    //登陆
    async onLogin () {
      Toast.loading({
        message: '登陆中...', //提示文本
        forbidClick: true, //禁止背景点击
        duration:0
      });
      try {
        const {data} = await login(this.user)
        console.log(data)
        Toast.success('登录成功');
        this.$router.push('/my');
        //登陆成功,把用户token放到vuex中
        this.$store.commit('setUser',data.data)
      }catch (error){
        console.log(error)
        Toast.fail('登陆失败,手机号或者验证码错误');
      }
    },

    // 表单验证弹框
    onFailed(err){
      console.log(err)
      if (err.errors[0]){
        Toast({
          message:err.errors[0].message,
          position: 'top'
        })
      }

    }
  }

}
</script>

<style scoped lang="less">
.login-container{
  .send-btn{
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__content{
      font-size: 11px;
      color: #666666;
    }
  }

  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}

</style>