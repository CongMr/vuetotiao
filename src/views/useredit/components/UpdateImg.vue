<template>
  <div class="update-img">
    <img :src="privrFile" alt="">
    <van-nav-bar left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onImg"/>
  </div>
</template>

<script>
import {userUpdateImg} from "@/api/useredit";

export default {
  name: "UpdateImg",
  props:{
    privrFile:{
      type:String,
      required:true
    }
  },
  methods:{
    async onImg(){
      const data = await userUpdateImg()
    }
  }
}
</script>

<style scoped>

</style>