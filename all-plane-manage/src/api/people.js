/*
 * @Description:
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-04-01 18:19:23
 * @LastRditors: gxlself
 * @LastEditTime: 2020-04-01 18:20:02
 */
import request from '@/utils/request'

export function queryList(data) {
  return request({
    url: '/people/list',
    method: 'post',
    data
  })
}
