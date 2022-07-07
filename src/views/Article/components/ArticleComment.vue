<template>
  <div class="article-comments">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateformat
            }}</span>

            <van-button size="mini" type="default" @click="fn(item)"
              >回复</van-button
            >
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import { getCommentList } from '@/api/commert'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'b'].includes(value)
      }
    },
    source: {
      type: [String, Number],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        // 数据已全部加载完毕，则直接 finished 设置成 true 即可
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.$emit('set-count', res.data.data.total_count)
        // console.log(res)
        this.commentList.push(...res.data.data.results) // 保存每一页数据
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每次当前页面数据拿回来了，就把loading转圈效果关闭掉
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList()
    },
    fn (item) {
      console.log(item)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
.article-comments {
  padding-bottom: 45px;
}
</style>
