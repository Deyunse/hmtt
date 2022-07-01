/**
 *获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  let res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
/**
 *设置
 * @param {*} key
 * @param {*} value
 */
// 这里转换不会 出现异常 所以这里不能用 try catch
export function setItem (key, value) {
  if (typeof value === 'object') { // 复杂数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 *根据key删除本地存储其中的一个
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
 * 删除所有的本地存储
 */
export function calearItem () {
  window.localStorage.calearItem()
}
