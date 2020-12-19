<template>
  <div class="update-sex">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index = sexindexs
    />
  </div>
</template>

<script>
import {userUpdatename} from "@/api/useredit";
import { Toast } from 'vant';
export default {
name: "UpdateSex",
  props:{
    sexindex:{
      type:Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      sexindexs:this.sexindex
    };
  },
  methods: {
    async onConfirm(value, index) {
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
      });
      const data = await userUpdatename({
        gender:this.sexindex
      })
      console.log(data)
      this.$emit('close')
      this.$emit('update-sex',this.sexindexs)
      Toast.success('修改成功')
    },

    onChange(picker, value, index) {
      this.sexindexs = index
    },
  },
}
</script>

<style scoped>

</style>