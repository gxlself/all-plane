import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/roles/list',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/roles/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/roles/alter`,
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: `/roles/delete`,
    method: 'post',
    data
  })
}
