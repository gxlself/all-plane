const TokenKey = 'token'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.getItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}
