/*
 * @Description: 菜单
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:01
 * @LastRditors: gxlself
 * @LastEditTime: 2020-04-01 11:06:29
 */
import request from '@/utils/request'

export function getMenus(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

export function addMenu(data) {
  return request({
    url: '/menu/add',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: `/menu/alter`,
    method: 'post',
    data
  })
}

export function deleteMenu(data) {
  return request({
    url: `/menu/delete`,
    method: 'post',
    data
  })
}

export function updateEnable(data) {
  return request({
    url: `/menu/updateEnable`,
    method: 'post',
    data
  })
}

export function getMenuTree() {
  return request({
    url: `/menu/treeData`,
    method: 'get'
  })
}
