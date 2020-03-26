import requrst from './request'

export function login(data) {
  return requrst({
    url: '/login',
    method: 'post',
    data
  })
}

export function loginout(data) {
  return requrst({
    url: '/loginout',
    method: 'get',
    data
  })
}