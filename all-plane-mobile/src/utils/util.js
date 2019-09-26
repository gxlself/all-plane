// ios机型判断
const isIos = () => {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
// isIphonX刘海屏
const isIphonX = () => {
  // iPhone X、iPhone XS
  var isIPhoneX = isIos() && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812
  // iPhone XS Max
  var isIPhoneXSMax = isIos() && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896
  // iPhone XR
  var isIPhoneXR = isIos() && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896
  return isIPhoneX || isIPhoneXR || isIPhoneXSMax
}
// 是否手机
const isMobile = () => {
  return !!(navigator && navigator.appVersion.match(/mobile/i))
}

module.exports = {
  isIos,
  isIphonX,
  isMobile
}
