<template>
  <div>
    <!-- 登录后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
            round
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <div>
        <ul class="list">
          <li>
            <p>{{ userInfo.art_count }}</p>
            <p>头条</p>
          </li>
          <li>
            <p>{{ userInfo.fans_count }}</p>
            <p>关注</p>
          </li>
          <li>
            <p>{{ userInfo.follow_count }}w</p>
            <p>粉丝</p>
          </li>
          <li>
            <p>{{ userInfo.like_count }}个小目标</p>
            <p>获赞</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <van-grid clickable :column-num="2">
      <van-grid-item icon="home-o" text="收藏" to="">
        <template #icon> <i class="toutiao toutiao-shoucang"></i> </template
      ></van-grid-item>
      <van-grid-item icon="search" text="历史" to="">
        <template #icon> <i class="toutiao toutiao-lishi"></i> </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button block class="logout" v-if="user && user.token" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'my',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        // console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗？' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.header {
  width: 750px;
  height: 401px;
  opacity: 0.8;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    height: 28px;
    font-size: 28px;
    font-weight: normal;
    color: #ffffff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      text-align: center;
      line-height: 33px;
      font-size: 20px;
      color: #666;
      font-weight: normal;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        width: 153px;
        height: 29px;
        font-size: 30px;
        color: #ffffff;
        margin-left: 22px;
        font-weight: normal;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #ffffff;
        font-weight: normal;
        &:nth-child(1) {
          font-size: 30px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #eb5253;
}
</style>
