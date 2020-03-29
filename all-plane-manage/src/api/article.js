import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/manage/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/manage/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/manage/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/manage/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/manage/article/update',
    method: 'post',
    data
  })
}
