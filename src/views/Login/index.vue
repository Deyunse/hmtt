<template>
  <div>
    <van-nav-bar title="登录">
      <!-- <van-icon name="cross" slot="left" /> 第一种写法 -->
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机格式' },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss 秒后重新发送"
            @finish="isCountDownShow = false"
          />
          <van-button
            @click="onSendSms"
            v-else
            round
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000, // 倒计时时间
      isCountDownShow: false // 默认不显示倒计时效果
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        // 将token 传递到vuex里面进行保存
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        // console.log('校验通过')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败，稍后重试')
        }
      } catch (err) {
        console.log('校验失败')
        this.$toast.fail('手机格式不正确') // 轻提示 手机号错误时
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 64px;
  background-color: #ededed;
  border-radius: 23px;
  color: #666;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
</style>
