import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/manage/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/manage/transaction/list',
    method: 'get',
    params: query
  })
}
