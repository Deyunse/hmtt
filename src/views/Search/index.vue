<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <!-- 当搜索框是空的，显示搜索历史 -->
    <!-- 当搜索框有值的时候，显示搜索推荐，当回车的时候显示搜索结果 -->
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResolt v-if="isSearch" :searchText="searchText"></SearchResolt>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchResolt from './components/SearchResult'
import SearchSuggest from './components/SearchSuggest'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false // 默认没有回车
    }
  },
  methods: {
    // 想实现：在搜索input回车的时候和给搜索
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
      },
      immediate: true
    }
  },
  filters: {},
  components: { SearchHistory, SearchResolt, SearchSuggest }
}
</script>

<style scoped lang='less'>
</style>
