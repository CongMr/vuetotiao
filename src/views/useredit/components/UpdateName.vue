<template>
  <div class="update-name">

    <van-nav-bar title="修改昵称" left-text="返回" right-text="完成"  @click-left="$emit('close')" @click-right="onClickRight"/>

    <div class="name-field">
      <van-field v-model="message" rows="2" autosize  type="textarea" maxlength="7" placeholder="请输入昵称" show-word-limit />
    </div>

  </div>
</template>

<script>
import {userUpdatename} from "@/api/useredit";
import { Toast } from 'vant';
export default {
name: "UpdateName",
  props:{
    editname:{
      type:String,
      required:true
    }
  },
  data(){
    return{
      message:this.editname
    }
  },
  methods:{
  //修改用户昵称
    async onClickRight(){
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
      });
     try {
       const data = await userUpdatename({
         name:this.message
       })
       console.log(data)
       this.$emit('close')
       this.$emit('update-name',this.message)
       Toast.success('修改成功')
     }catch (err){
        if (err && err.response && err.response.status === 409){
          Toast.fail('昵称已存在')
        }
     }
    }
  }
}
</script>

<style scoped lang="less">
.name-field{
  padding: 10px;
}
</style>