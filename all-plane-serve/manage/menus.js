const { sqlTodo } = require('../utils/sql');
const { currentTime, checkString, checkNumber, completeMenus } = require('../utils/util')
const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('menus')


const addMenu = function(req, res, next) {
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
    if (!checkNumber(type) || !(Number(type) === 1 || Number(type) === 2)) {
      res.send(eMsg('type is invalid'))
      return
    }
    if (!checkNumber(parentId)) {
      parent_id = 0
    } else {
      parent_id = parentId
    }
    let create_date = currentTime()
    const sql = `INSERT INTO m_menus (menu_name, sort, type, icon, parent_id, url, create_date) VALUES('${menu_name}', ${Number(sort)}, ${Number(type)}, '${icon || ''}', '${parent_id}', '${url}','${create_date}');`
    sqlTodo(sql)
      .then(result => {
        res.send(sMsg(null))
      })
      .catch(err => {
        logger.error(`添加菜单异常 ====== ${err.message}`)
        res.send(eMsg())
      })
}
const alterMenu = function(req, res, next) {
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
    const sql = `UPDATE m_menus SET menu_name='${menu_name}',sort=${Number(sort)},icon='${icon}',url='${url}' WHERE id=${Number(id)};`
    sqlTodo(sql)
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
const delMenu = function(req, res, next) {
    const { id } = req.body
    if (!checkNumber(id)) {
      res.send(eMsg('id is invalid, id must be number'))
      return
    }
    const sql = `DELETE FROM m_menus WHERE id=${Number(id)};`
    sqlTodo(sql)
      .then(result => {
        res.send(sMsg(null, '删除成功'))
      })
      .catch(err => {
        logger.error(`删除菜单异常 ====== ${err.message}`)
        res.send(eMsg())
      })
}
const menuList = function(req, res, next) {
    const { page, size, parentId, name, enable } = req.query
    if (!checkNumber(page)) {
      res.send(eMsg('page is invalid'))
      return
    }
    if (!checkNumber(size)) {
      res.send(eMsg('size is invalid'))
      return
    }
    const listSql = `SELECT * FROM m_menus WHERE parent_id=${checkNumber(parentId) ? Number(parentId) : 0}${name ? ' AND name=' + name : ''}${enable === '0' ? ' AND enable=0' : (enable === '1' ? ' AND enable=1':'')} LIMIT ${(Number(page) - 1) * Number(size)}, ${Number(page) * Number(size)}`
    const countSql = `SELECT COUNT(*) AS count FROM m_menus WHERE parent_id=${checkNumber(parentId) ? Number(parentId) : 0}`
    sqlTodo(listSql)
      .then(list => { 
        sqlTodo(countSql)
          .then(result => { 
            res.send(sMsg({list, count: result[0].count})); 
          })
          .catch(err => { 
            logger.error(`获取菜单总数异常 ====== ${err.message}`);
            logger.error(`获取菜单总数countSql ====== ${countSql}`);
            res.send(eMsg()); 
          });
      }) 
      .catch(err => { 
        logger.error(`获取菜单列表异常 ====== ${err.message}`);
        logger.error(`获取菜单列表listSql ====== ${listSql}`);
        res.send(eMsg()); 
      });
    data = null;
}
const menuEnable = function(req, res, next) {
    const { id, enable } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  if (!checkNumber(enable)) {
    res.send(eMsg('enable is invalid'))
    return
  }
  const updateSql = `UPDATE m_menus SET enable=${Number(enable)} WHERE id=${id}`
  sqlTodo(updateSql)
    .then(result => {
      if (result.affectedRows === 0) {
        logger.error(`启用/禁用菜单异常sql ====== ${updateSql}`)
        res.send(eMsg())
      } else {
        logger.error(`启用/禁用菜单异常sql ====== ${updateSql}`)
        res.send(sMsg())
      }
    })
    .catch(err => {
      logger.error(`启用/禁用菜单异常sql ====== ${updateSql}`)
      res.send(eMsg())
    })
}
module.exports = {
    addMenu,
    alterMenu,
    delMenu,
    menuList,
    menuEnable
}