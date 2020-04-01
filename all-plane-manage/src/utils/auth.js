const TokenKey = 'toke'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getName() {
  return sessionStorage.getItem('username')
}

export function setName(username) {
  return sessionStorage.setItem('username', username)
}

export function removeName() {
  return sessionStorage.removeItem('username')
}
