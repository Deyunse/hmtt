import request from '@/utils/requst'
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
 *
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
