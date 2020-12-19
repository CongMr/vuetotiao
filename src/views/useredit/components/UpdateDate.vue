<template>
  <div class="update-date">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel= "$emit('close')"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import {userUpdatedate} from "@/api/useredit";
import { Toast } from 'vant';
import dayjs from 'dayjs'
export default {
name: "UpdateDate",
  props:{
    birthday:{
      type:String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.birthday),
    };
  },
  methods:{
    async confirm(){
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
      });

      //通过js获取时间
      // const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
      // console.log(date)

      //通过day.js获取时间
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      // console.log(date)

      const data = await userUpdatedate({
        birthday:date
      })
      console.log(data)

      this.$emit('close')

      this.$emit('update-birthday',date)

      Toast.success('修改成功')
    },
  }
}
</script>

<style scoped>

</style>