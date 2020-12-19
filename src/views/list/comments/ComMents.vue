<template>
  <div class="comments-list">
    <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import {getComments} from "@/api/comments";

export default {
name: "ComMents",
  props:{
    commentid: {
      type: [String,Object,Number],
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offest:null,
      totalCount:10
    };
  },
  methods: {
    async onLoad() {
      const  {data} = await getComments({
        type: 'a',
        source: this.commentid,
        offset:this.offest,
        limit:this.totalCount
      })
      console.log(data)
    },
  },
}
</script>

<style scoped>

</style>