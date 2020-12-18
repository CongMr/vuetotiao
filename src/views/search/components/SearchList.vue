<template>
  <div class="search-list">


    <van-cell title="搜索历史">
      <div v-if="isDelect">
        <span @click="$emit('delectall',[])">全部删除</span>
        &nbsp;&nbsp;
        <span  @click="isDelect = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDelect =true"/>
    </van-cell>

    <van-cell v-for="(item,index) in searchHisdory" :key="index" :title="item" center @click="onDelect(item,index)">
      <van-icon  name="close" v-show="isDelect"/>
    </van-cell>



  </div>
</template>

<script>
import {setItem} from "@/utils/storage";

export default {
name: "SearchList",
  props:{
    searchHisdory:{
      type:Array,
      required:true
    }
  },
  data(){
    return{
      isDelect:false
    }
  },
  methods:{
    //单个删除
    onDelect(value,index){
      //如果是删除状态,单个删除
      if (this.isDelect){
        this.searchHisdory.splice(index,1)
        setItem('search-history',this.searchHisdory)
      }else {
        //如果不是删除状态，显示搜索结果
        this.$emit('search',value)
      }
    },
    delHisdory(searchHisdory){
      console.log(searchHisdory)
    }
  }
}
</script>

<style scoped>

</style>