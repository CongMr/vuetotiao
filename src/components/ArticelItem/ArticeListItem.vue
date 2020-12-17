<template>
  <van-cell class="articel-item">
    <div slot="title" class="title van-multi-ellipsis--l3">{{articel.title}}</div>

    <div slot="label">
      <div class="cover-warp"  v-if="articel.cover.type === 3" >
        <div class="cover-warp-item"  v-for="(img,index) in articel.cover.images">
          <van-image fit="cover" class="cover-item" :key="index" width="116" height="73"   :src="img" />
        </div>
      </div>
      <div class="lable-wrap">
        <span>{{articel.aut_name}}</span>
        <span>{{articel.comm_count}}</span>
        <span>{{articel.pubdate | relativeTime}}</span>
      </div>
    </div>

    <van-image v-if="articel.cover.type === 1" class="right-cover" fit="cover" :src="articel.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
name: "ArticeListItem",
  props:{
    articel:{
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.articel-item{
  .title{
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    width: 116px ;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover{
    width: 116px ;
    height: 73px;
  }
  .cover-warp{
    padding:15px 0px;
    display: flex;
    .cover-warp-item{
      flex: 1;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item{
        width: 100%;
        height: 73px;
      }
    }
  }
  .lable-wrap{
    font-size: 11px;
    color: #b4b4b4;
  }
  .lable-wrap span{
    margin-right: 12px;
  }
}
</style>