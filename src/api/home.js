import request from '@/utils/requst'
/**
 * 我频道
 * @returns
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
/**
 *获取文章列表
 * @param {*} obj
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticeList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}
/**
 *获取所有
 * @returns
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'

  })
}
/**
 *频道数据持久化
 * @param {*} channels
 * @returns
 */
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
