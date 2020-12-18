<template>
  <div class="search-container">
    <!--    搜索栏-->
    <form action="/">
      <van-search v-model="serchText" placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.back()" show-action @focus="isResultShow=false"/>
    </form>
    <!--    搜索栏-->

    <!--    搜索结果-->
    <search-results v-if="isResultShow"/>
    <!--    搜索结果-->

    <!--    联想建议-->
    <search-advice v-else-if="serchText"/>
    <!--    联想建议-->

    <!--    历史记录-->
    <search-list v-else/>
    <!--    历史记录-->


  </div>
</template>

<script>
import SearchAdvice from "@/views/search/components/SearchAdvice";
import SearchList from "@/views/search/components/SearchList";
import SearchResults from "@/views/search/components/SearchResults";

export default {
  name: "index",
  components:{
    SearchAdvice,
    SearchList,
    SearchResults,
  },
  data() {
    return {
      serchText: '',  //搜索框内容
      isResultShow: false, //控制搜索结果的显示状态
    };
  },
  methods:{
    onSearch(){
      this.isResultShow = true
    },
  }
}
</script>

<style scoped>

</style>