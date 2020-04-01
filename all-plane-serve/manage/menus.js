/*
 * @Description: 菜单管理
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:02
 * @LastRditors: gxlself
 * @LastEditTime: 2020-04-01 15:26:56
 */
const { sqlTodo } = require('../utils/sql');
const { currentTime, checkString, checkNumber, completeMenus } = require('../utils/util')
const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('menus')

/**
 * @description: 添加菜单
 */

const addMenu = (req, res, next) => {
  const {menu_name, sort, type, icon, url, parentId} = req.body
  let parent_id = 0
  if (!checkString(menu_name)) {
    res.send(eMsg('menu_name is invalid'))
    return
  }
  if (!checkNumber(sort)) {
    res.send(eMsg('sort is invalid'))
    return
  }
  if (!checkNumber(type) || !(Number(type) === 0 || Number(type) === 1)) {
    res.send(eMsg('type is invalid'))
    return
  }
  if (!checkNumber(parentId)) {
    parent_id = 0
  } else {
    parent_id = parentId
  }
  let create_date = currentTime()
  const SQL = `INSERT INTO m_menus (menu_name, sort, type, icon, parent_id, url, create_date) VALUES('${menu_name}', ${Number(sort)}, ${Number(type)}, '${icon || ''}', '${parent_id}', '${url}','${create_date}');`
  sqlTodo(SQL)
    .then(result => {
      res.send(sMsg(null))
    })
    .catch(err => {
      logger.error(`添加菜单异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 更新菜单
 */
const alterMenu = (req, res, next) => {
  const {menu_name, sort, id, icon, url, parentId, type} = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  if (!checkString(menu_name)) {
    res.send(eMsg('menu_name is invalid'))
    return
  }
  if (!checkNumber(sort)) {
    res.send(eMsg('sort is invalid'))
    return
  }
  const SQL = `UPDATE m_menus SET menu_name='${menu_name}',sort=${Number(sort)},icon='${icon}',url='${url}' WHERE id=${Number(id)};`
  sqlTodo(SQL)
    .then(result => {
      if (result.affectedRows === 0) {
        logger.error(`修改菜单异常 ====== id as menus for none`)
        res.send(eMsg('id as menus for none'))
      } else {
        res.send(sMsg(null, '修改成功'))
      }
    })
    .catch(err => {
      logger.error(`修改菜单异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}
/**
 * @description: 删除菜单
 */
const delMenu = (req, res, next) => {
  const { id } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid, id must be number'))
    return
  }
  const SQL = `DELETE FROM m_menus WHERE id=${Number(id)};`
  sqlTodo(SQL)
    .then(result => {
      res.send(sMsg(null, '删除成功'))
    })
    .catch(err => {
      logger.error(`删除菜单异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}
/**
 * @description: 菜单列表
 */
const menuList = (req, res, next) => {
  const { page, size, parentId, name, enable } = req.query
  if (!checkNumber(page)) {
    res.send(eMsg('page is invalid'))
    return
  }
  if (!checkNumber(size)) {
    res.send(eMsg('size is invalid'))
    return
  }
  const listSQL = `SELECT * FROM m_menus WHERE parent_id=${checkNumber(parentId) ? Number(parentId) : 0} AND menu_name LIKE "%${name}%" AND enable LIKE "%${enable}%" ORDER BY sort LIMIT ${(Number(page) - 1) * Number(size)}, ${Number(page) * Number(size)}`
  const countSQL = `SELECT COUNT(*) AS count FROM m_menus WHERE parent_id=${checkNumber(parentId) ? Number(parentId) : 0}`
  Promise.all([sqlTodo(listSQL), sqlTodo(countSQL)])
    .then(values => {
      let timer = setTimeout(() => {
        res.send(sMsg({list: values[0], count: values[1][0].count})); 
        clearTimeout(timer)
      }, 1000)
    })
    .catch(err => {
      logger.error(`获取菜单列表异常 ====== ${err.message}`);
      logger.error(`获取菜单列表listSQL ====== ${listSQL}`);
      res.send(eMsg()); 
    })
}
/**
 * @description: 启用状态修改
 */
const menuEnable = (req, res, next) => {
  const { id, enable } = req.body
if (!checkNumber(id)) {
  res.send(eMsg('id is invalid'))
  return
}
if (!checkNumber(enable)) {
  res.send(eMsg('enable is invalid'))
  return
}
const updateSQL = `UPDATE m_menus SET enable=${Number(enable)} WHERE id=${id}`
sqlTodo(updateSQL)
  .then(result => {
    if (result.affectedRows === 0) {
      logger.error(`启用/禁用菜单异常 SQL ====== ${updateSQL}`)
      res.send(eMsg())
    } else {
      res.send(sMsg())
    }
  })
  .catch(err => {
    logger.error(`启用/禁用菜单异常 SQL ====== ${updateSQL}`)
    res.send(eMsg())
  })
}

/**
 * @description: 菜单树
 */
const menuTreeData = async (req, res, next) => {
  // completeMenus()
  try {
    const treeData = await completeMenus()
    res.send(sMsg({treeData}))
  } catch (err) {
    logger.error(`获取菜单树异常 ====== ${err.message || '异常错误'}`)
    res.send(eMsg())
  }
}

module.exports = {
  addMenu,
  alterMenu,
  delMenu,
  menuList,
  menuEnable,
  menuTreeData
}