<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left> <van-icon name="cross" /> </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >回复</van-button
      >
    </div>
    <!-- 添加 -->
    <van-popup position="bottom" v-model="isAddCommentShow" class="popup"
      ><AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++
        "
      ></AddComment
    ></van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment'
import { getCommentList } from '@/api/commert'
import CommentItem from './CommentItem'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () { this.getCommentList() },
  data () {
    return {
      offset: null,
      limit: 9999,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  height: 110px;
  position: fixed;
  bottom: 0;
  width: 750px;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
  button {
    border: 0;
  }
}
.popup {
  z-index: 9999;
}
</style>
