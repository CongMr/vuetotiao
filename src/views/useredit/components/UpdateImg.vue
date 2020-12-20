<template>
  <div class="update-img">
    <img class="image" :src="imgfile" alt="" ref="image">
    <van-nav-bar left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onImg" class="imgtar" :border="false"/>
  </div>
</template>

<script>
import {userUpdateImg} from "@/api/useredit";
import {Toast} from "vant";
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
  name: "UpdateImg",
  props:{
    privrFile:{
      required:true
    }
  },
  data(){
    return{
      imgfile: window.URL.createObjectURL(this.privrFile),
      cropper:null //裁切器实例
    }
  },
  mounted() {
    //获取需要裁切的图片Dom
    const image = this.$refs.image;

    this.cropper = new Cropper(image, {
      // aspectRatio:16 / 9,
      viewMode:1,
      dragMode:'move',
      aspectRatio:1,
      // autoCropArea:1, //是否可以拖拽
      cropBoxMovable:false,
      cropBoxResizable:false,
      background:false,
      movable:true
    });
  },

  methods:{

    getCroppedCanvas(){
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },

    async onImg(){
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
      });

      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo',file)

      // const fd = new FormData()
      // fd.append('photo',this.privrFile)
      await userUpdateImg(fd)

      this.$emit('close')

      this.$emit('update-img',window.URL.createObjectURL(file))

      Toast.success('修改成功')
    }
  }
}
</script>

<style scoped lang="less">
.imgtar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 55px;
  background-color: #000;
}

.image {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>