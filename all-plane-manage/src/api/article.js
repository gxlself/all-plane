import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/article/list',
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteArticle(id) {
  return request({
    url: '/article/delete',
    method: 'get',
    params: { id }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/article/status',
    method: 'post',
    data
  })
}

export function addComment(data) {
  return request({
    url: '/article/addComment',
    method: 'post',
    data
  })
}

export function deleteComment(data) {
  return request({
    url: '/article/deleteComment',
    method: 'get',
    data
  })
}

export function changeCommentStatus(data) {
  return request({
    url: '/article/changeCommentStatus',
    method: 'post',
    data
  })
}
