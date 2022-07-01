<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          size="mini"
          plain
          type="danger"
          round
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id"
          ><div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-if="index !== 0"
              v-show="isCloseShow"
              @click="delClose(item.id)"
            /></div
        ></van-col>
      </van-row>
    </div>
    <!-- 推荐频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id"
          ><div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelsPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      // 根据id 找到当前点击的索引
      const index = this.recommendChannels.findIndex(item => item.id === id)
      // 根据索引添加将recommendChannels的index项 添加到 我的频道里
      this.channels.push(this.recommendChannels[index])
      // 根据索引号 在推荐频道里面 移除index哪一项2
      this.recommendChannels.splice(index, 1)
    },
    delClose (id) {
      //  自己写的删除方法
      // const index = this.channels.findIndex(item => item.id === id)
      // this.recommendChannels.push(this.channels[index])
      // this.channels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) return
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        console.log(123)
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登录过
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          // 先把数据处理
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    padding: 50px 16px 0 24px;
    margin-bottom: 20px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
}
.inner {
  width: 160px;
  height: 84px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: normal;
  color: #333;
  text-align: center;
  line-height: 84px;
  margin-left: 14px;
  margin-bottom: 22px;
  position: relative;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
</style>
