<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    class="add-field"
    center
    ref="field"
    ><template #extra>
      <!-- 当输入框没有内容的时候，按钮就应该禁用 -->
      <van-button type="default" :disabled="message === ''" @click="onClick"
        >发送</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/commert'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    // 如果是对文章进行评论不用传，对评论进行评论要传
    art_id: {
      type: [Number, String]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({ target: this.target, content: this.message, art_id: this.art_id })
        // console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // 组件最终会变成Dom结构，$el可以获取这个组件的跟标签dom
    // $refs 可以获取组件
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field {
  button {
    border: none;
  }
}
</style>
