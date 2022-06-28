import request from '@/utils/requst'
import store from '@/store'
/**
 *获取短信验证码
 * @param {number} mobile
 * @returns
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
/**
 *登录接口
 * @param {mobile,code} param0
 * @returns promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 获取用户个人资料
 */
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
