// 鼻梁创建过滤器 好处 代码简单，
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
