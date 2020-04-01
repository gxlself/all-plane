/*
 * @Description:
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:01
 */
import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/roles/list',
    method: 'get',
    params
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

export function updateEnable(data) {
  return request({
    url: `/roles/updateEnable`,
    method: 'post',
    data
  })
}

export function rolesAuth(data) {
  return request({
    url: `roles/auth`,
    method: 'post',
    data
  })
}
