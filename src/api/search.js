import request from '@/utils/requst'

export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: { q }
  })
}
/**
 *获取搜索结果列表
 * @param {*} page 当前第几页 per_page 煤业数量 q搜索关键词
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
