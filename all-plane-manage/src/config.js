/********** 请求地址动态配置 **********/
const devUrlArr = [
	'172.16.1.238'
]
const testUrlArr = [
	'172.16.1.238'
]
const buildUrlArr = [
  '172.16.1.238'
]
const config = { 
  baseUrl: 'http://172.16.1.238:3333/manage',
};

if (window && window.location) {
	// 开发模式配置
	if (devUrlArr.indexOf(window.location.hostname) > -1) {
		config.baseUrl = 'http://172.16.1.238:3333/manage'
	}
	// 测试配置
	if (testUrlArr.indexOf(window.location.hostname) > -1) {
		config.baseUrl = 'http://172.16.1.238:3333/manage'
	}
}

export default config