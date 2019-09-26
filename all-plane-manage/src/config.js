/* ********* 请求地址动态配置 ********* */
const devUrlArr = [
  '172.16.1.242',
  'localhost'
]
const testUrlArr = [
  '172.16.1.242',
  'localhost'
]
// const buildUrlArr = [
//   'gxlself.com'
// ]
const config = {
  baseUrl: 'https://mi400.4zlink.com:8082/backend',
  osshost: 'https://img.4zlink.com/'
}

if (window && window.location) {
  // 开发模式配置
  if (devUrlArr.indexOf(window.location.hostname) > -1) {
    config.baseUrl = 'http://172.16.1.242:3333/manage'
  }
  // 测试配置
  if (testUrlArr.indexOf(window.location.hostname) > -1) {
    config.baseUrl = 'http://172.16.1.242:3333/manage'
  }
}

export default config
