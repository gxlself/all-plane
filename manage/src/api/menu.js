

import request from '@/utils/request'

export function getMenus() {
  return request({
    url: '/menu/list',
    method: 'get'
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
