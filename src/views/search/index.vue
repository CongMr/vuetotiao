<template>
  <div class="search-container">
    <!--    搜索栏-->
    <form action="/">
      <van-search v-model="serchText" placeholder="请输入搜索关键词" @search="onSearch(serchText)" @cancel="$router.back()" show-action @focus="isResultShow=false"/>
    </form>
    <!--    搜索栏-->

    <!--    搜索结果-->
    <search-results v-if="isResultShow" :searchtext="serchText"/>
    <!--    搜索结果-->

    <!--    联想建议-->
    <search-advice v-else-if="serchText" :searchtext="serchText" @search="onSearch"/>
    <!--    联想建议-->

    <!--    历史记录-->
    <search-list v-else :searchHisdory="searchHisdory" @search="onSearch" @delectall="delectAll"/>
    <!--    历史记录-->


  </div>
</template>

<script>
import SearchAdvice from "@/views/search/components/SearchAdvice";
import SearchList from "@/views/search/components/SearchList";
import SearchResults from "@/views/search/components/SearchResults";

// import {getSearchHistory} from "@/api/search";
import {getItem, setItem} from "@/utils/storage";
import {mapState} from 'vuex'

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
      searchHisdory: [] , //搜索记录
    };
  },
  created() {
    this.hisTorypush()
  },
  computed:{
    ...mapState(['userToken'])
  },
  methods:{
    async onSearch(serchText){

      //把输入框数据设置为想要搜索的文本
      this.serchText = serchText

      //判断搜索重复项
      const index = this.searchHisdory.indexOf(serchText)
      if (index !== -1){
        this.searchHisdory.splice(index,1)
      }

      //把新搜索到的数据放到顶部
      this.searchHisdory.unshift(serchText)

      setItem('search-history',this.searchHisdory)

      this.isResultShow = true
    },

     hisTorypush(){
      //获取本地存储记录
      const history = getItem('search-history') || []
      //判断用户有没有登陆，如果登陆了，获取线上历史记录，如果没登陆，保存到本地
      // if (this.userToken){
      //   const {data} = await getSearchHistory() || [];
      //   history = [...new Set([...history, ...data.data.keywords])]
      // }
      this.searchHisdory = history
    },

    //全部删除
    delectAll(){
      this.searchHisdory=[]
      setItem('search-history',this.searchHisdory)
    }
  }
}
</script>

<style scoped>

</style>