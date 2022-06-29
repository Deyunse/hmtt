<template>
  <van-cell-group>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          :title="item.title"
          value="内容"
          label="描述信息"
          v-for="(item, index) in articeList"
          :key="index"
        />
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticeList } from '@/api/home'
export default {
  name: 'AticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticeList()
  },
  data () {
    return {
      timestamp: Date.now(),
      articeList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticeList () {
      if (this.refreshing) {
        this.articeList = [] // 将数据更新为空 下拉刷新重新赋值
        this.refreshing = false //
      }
      try {
        const res = await getArticeList({ channel_id: this.id, timestamp: this.timestamp })
        // console.log(res)
        // 第一页到底返回的时间赋值给timestamp 下次请求再发送过去请求第二页
        this.timestamp = res.data.data.pre_timestamp
        // 若数据已全部加载完毕，则直接将 finished 设置为true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articeList.push(...res.data.data.results)
        // 数据更新完毕后 ，将loading 设置成false
        this.loading = false
      } catch (err) { console.log(err) }
    },
    onLoad () {
      this.getArticeList()
    },
    onRefresh () {
      this.finished = false // 防止用户把数据加载 结束
      this.loading = true // 重新加载数据
      this.timestamp = Date.now() // 获取第一页数据就要把时间戳更新为当前时间
      this.getArticeList() // 调用ajax
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
  padding-bottom: 70px;
}
</style>
