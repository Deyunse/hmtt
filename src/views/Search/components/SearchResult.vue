<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in searList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1, // 请求的页数
      per_page: 20, // 每页多少条
      searList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // 数据加载完了需要把fininshd 变为true 底部就会显示 (没有更多了)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 新旧数据要合并在一起 而不是把旧的数据覆盖掉
        this.searList.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false // 下拉刷新 返回数据后 将refreshing 改为false 停止刷新转圈
      } catch (err) {
        console.log(err)
      }
    },
    // 触底更新触发
    onLoad () {
      // 滑动触底 触发该方法
      // 触底+1
      this.page++
      // 请求下一页数据
      this.getSearchResult()
    },
    // 下拉刷新触发
    onRefresh () {
      // 把原来的数据清空`
      this.searList = []
      // 回到初始值 第一页
      this.page = 1
      // 发送新的ajax
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px); //100vh 包括了那vbar导航栏
}
</style>
