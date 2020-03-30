const { sqlTodo } = require('./sql')
// 返回当前服务端时间
const currentTime = function() {
  let d = new Date()
  let year = d.getFullYear()
  let mon = checkSingle(d.getMonth() + 1)
  let day = checkSingle(d.getDate())
  let hour = checkSingle(d.getHours())
  let min = checkSingle(d.getMinutes())
  let sec = checkSingle(d.getSeconds())
  return `${year}-${mon}-${day} ${hour}:${min}:${sec}`
}
// 校验单双数返回双数
const checkSingle = function(time) {
  let exec_time = time < 10 ? '0' + time : time
  return exec_time
}
// 校验字符串
const checkString = function(str) {
  if (str === null || str === undefined || str === '') {
    return false
  }
  if (typeof str === 'string' && str !== '') {
    return true
  } 
  console.log('checkString', str)
  return false
}
// 校验数字
const checkNumber = function(num) {
  // console.log(`num is ${num} type is ${typeof num}`)
  if (num === undefined || num === null) {
    return false
  }
  if ((typeof num === 'number' && !isNaN(num)) || num === '0' || checkNumber(Number(num))) {
    return true
  } 
  if (Number(num) !== 0) {
    return true
  }
  return false
}
// 递归处理 菜单数组数据  为 json数据
const setMenu = function(allMenus, isFilter, needMenus) {
  let needMenu = getChilds(0, allMenus)
  function getChilds(id, menus) {
    let newMenu = []
    let copyMenus = menus.map(item => {
      if (!Array.isArray(item.childrens)) {
        item.childrens = []
      }
      return item
    })
    for (let i = 0; i < copyMenus.length; i++) {
      if (isFilter) {
        if (copyMenus[i].parent_id === id && needMenus.includes(copyMenus[i].id)) {
          copyMenus[i].childrens = getChilds(copyMenus[i].id, copyMenus)
          newMenu.push(copyMenus[i])
          copyMenus.splice(i, 1)
          i--
        }
      } else {
        if (copyMenus[i].parent_id === id) {
          copyMenus[i].childrens = getChilds(copyMenus[i].id, copyMenus)
          newMenu.push(copyMenus[i])
          copyMenus.splice(i, 1)
          i--
        }
      }
    }
    return newMenu
  }
  return needMenu
}
// 处理菜单数组转为数据
const completeMenus = function(needMenus, isFilter) {
  // console.log('isFilter', isFilter)
  return new Promise((resolve, reject) => {
    const queryMenusSql = `SELECT * FROM m_menus`;
    sqlTodo(queryMenusSql)
      .then(result => {
        resolve(setMenu(result, isFilter, needMenus))
      })
      .catch(err => {
        reject(err)
      })
  })
}
module.exports = {
  currentTime,
  checkString,
  checkNumber,
  completeMenus,
}