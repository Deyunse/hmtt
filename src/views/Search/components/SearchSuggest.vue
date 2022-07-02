<template>
  <div>
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="higtliht(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
// 响应式数据写在data，非响应式写在 export default 上面 这样性能高一点
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    higtliht (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, ` <span style="color:red"> ${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        // async 和 await必须是一个函数
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
