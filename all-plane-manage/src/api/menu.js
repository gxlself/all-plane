import request from '@/utils/request'

export function getMenus(options) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: options
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
