<template>
  <div>
    <!--    导航栏-->
    <van-nav-bar title="个人信息" class="app-nav-bar" left-arrow @click-left="$router.back()" />

    <input type="file" accept="image/png,image/jpg" hidden ref="file"  @change="imgChange">

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image width="30" height="30" round  fit="cover" :src="editlist.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="editlist.name" @click="isEditshow = true"/>
    <van-cell title="性别" is-link :value="editlist.gender === 0 ? '男' : '女'"  @click="isSexshow=true"/>
    <van-cell title="生日" is-link :value="editlist.birthday" @click="isDateshow = true"/>

<!--    修改姓名-->
    <van-popup v-model="isEditshow" position="bottom" :style="{ height: '100%' }" >
      <update-name @close="isEditshow=false" :editname = "editlist.name" @update-name="editlist.name = $event" v-if="isEditshow"/>
    </van-popup>

    <!--    修改性别-->
    <van-popup v-model="isSexshow" position="bottom"  >
      <update-sex v-if="isSexshow" @close="isSexshow=false" :sexindex="editlist.gender" @update-sex="editlist.gender = $event"/>
    </van-popup>

    <!--    修改时间-->
    <van-popup v-model="isDateshow" position="bottom"  >
      <update-date v-if="isDateshow" :birthday = "editlist.birthday" @close="isDateshow = false" @update-birthday = "editlist.birthday = $event"/>
    </van-popup>

    <!--    修改用户头像-->
    <van-popup v-model="isImgshow" position="bottom"  style="height: 100%">
      <update-img v-if="isImgshow" :privrFile = "privrFile" @close="isImgshow = false"/>
    </van-popup>
  </div>
</template>

<script>
import {userEdit} from "@/api/useredit";
import UpdateName from "@/views/useredit/components/UpdateName";
import UpdateSex from "@/views/useredit/components/UpdateSex";
import UpdateDate from "@/views/useredit/components/UpdateDate";
import UpdateImg from "@/views/useredit/components/UpdateImg";
export default {
  name: "index",
  components:{
    UpdateName,
    UpdateSex,
    UpdateDate,
    UpdateImg
  },
  data(){
    return{
      editlist:{},
      isEditshow:false, //控制修改姓名显示与隐藏
      isSexshow :false ,//控制修改性别显示与隐藏
      isDateshow: false,//控制修改时间显示与隐藏
      isImgshow:false, //控制修改图片显示与隐藏
      privrFile:null
    }
  },
  created() {
    this.getEdit()
  },
  methods:{
    //获取用户个人资料
    async getEdit(){
      const  {data } = await userEdit()
      console.log(data)
      this.editlist = data.data
    },
    // 获取点击图片焦点
    imgChange(){
      this.isImgshow = true
      // console.log(this.$refs.file)
      // console.log(this.$refs.file.files[0])

      //获取选中图片的dom img信息
      const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      this.privrFile = blob

      //为了解决相同文件不触发chang事件，所以这里手动清空file的value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-popup{
  background-color: #f5f7f9;
}
</style>