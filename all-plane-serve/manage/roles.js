/*
 * @Description: 角色管理
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-31 11:23:41
 * @LastRditors: gxlself
 * @LastEditTime: 2020-04-01 12:30:59
 */
const { sqlTodo } = require('../utils/sql');
const { checkString, checkNumber, completeMenus, currentTime } = require('../utils/util')
const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('roles')

/**
 * @description: 添加角色
 */
const addRoles = (req, res, next) => {
  const { role_name, remark } = req.body
  if (!checkString(role_name)) {
    res.send(eMsg('role_name is invalid'))
    return
  }
  const SQL = `INSERT INTO m_roles (role_name, remark, create_date, last_modify) VALUES('${role_name}', '${remark}', '${currentTime()}', '${currentTime()}');`
  sqlTodo(SQL)
    .then(result => {
      res.send(sMsg())
    })
    .catch(err => {
      logger.error(`添加角色异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 修改角色
 */
const alterRoles = (req, res, next) => {
  const { name, remark, id } = req.body
  if (!checkString(name)) {
    res.send(eMsg('name is invalid'))
    return
  }
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  const SQL = `UPDATE m_roles SET role_name='${name}',remark='${remark}',last_modify='${currentTime()}' WHERE id=${Number(id)}`
  sqlTodo(SQL)
    .then(result => {
      if (result.affectedRows === 0) {
        logger.error(`修改角色异常 ====== id as roles for none`)
        res.send(eMsg('id as roles for none'))
      } else {
        res.send(sMsg())
      }
    })
    .catch(err => {
      logger.error(`修改角色异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 删除角色
 */
const delRoles = (req, res, next) => {
  const { id } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  const SQL = `DELETE FROM m_roles WHERE id=${Number(id)}`
  sqlTodo(SQL)
    .then(result => {
      res.send(sMsg())
    })
    .catch(err => {
      logger.error(`删除角色异常 ====== ${err.message}`)
      res.send(eMsg('删除失败'))
    })
}

/**
 * @description: 角色列表
 */
const rolesList = (req, res, next) => {
  const { role_name, page, size, enable } = req.query
  if (!checkNumber(page)) {
    res.send(eMsg('page is invalid'))
    return
  }
  if (!checkNumber(size)) {
    res.send(eMsg('size is invalid'))
    return
  }
  const listSQL = `SELECT * FROM m_roles WHERE role_name LIKE "%${role_name}%" AND enable LIKE "%${enable}%" LIMIT ${(Number(page) - 1) * Number(size)}, ${Number(page) * Number(size)};`
  const countSQL = `SELECT COUNT(*) AS count FROM m_roles;`
  Promise.all([sqlTodo(listSQL), sqlTodo(countSQL)])
    .then(values => {
      const list = values[0].map(item => {
        if (item.menus === null || item.menus === '') {
          item.menus = []
        } else {
          item.menus = JSON.parse(item.menus)
        }
        item.last_modify = currentTime(item.last_modify)
        item.create_date = currentTime(item.create_date)
        return item
      })
      const count = values[1][0].count
      let timer = setTimeout(() => {
        res.send(sMsg({list, count})); 
        clearTimeout(timer)
      }, 1000)
    })
    .catch(err => {
      logger.error(`获取角色列表异常 ====== ${err.message}`);
      logger.error(`获取角色列表listSQL ====== ${listSQL}`);
      res.send(eMsg()); 
    })
}

/**
 * @description: 角色授权
 */
const rolesAuth = (req, res, next) => {
  const { menus, id } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  const SQL = `UPDATE m_roles SET menus='[${menus}]' WHERE id=${Number(id)}`
  sqlTodo(SQL)
    .then(result => {
      if (result.affectedRows === 0) {
        logger.error(`角色授权未修改异常 ====== 未操作成功`)
        logger.error(`角色授权未修改SQL ====== ${SQL}`)
        res.send(eMsg('id is invalid'))
      } else {
        res.send(sMsg())
      }
    })
    .catch(err => {
      logger.error(`角色授权异常 ====== ${err.message}`)
      res.send(eMsg())
    }) 
}

/**
 * @description: 启用状态修改
 */
const rolesEnable = (req, res, next) => {
  const { id, enable } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  if (!checkNumber(enable)) {
    res.send(eMsg('enable is invalid'))
    return
  }
  const updateSQL = `UPDATE m_roles SET enable=${Number(enable)} WHERE id=${id}`
  sqlTodo(updateSQL)
    .then(result => {
      if (result.affectedRows === 0) {
        logger.error(`启用/禁用角色异常SQL ====== ${updateSQL}`)
        res.send(eMsg())
      } else {
        res.send(sMsg())
      }
    })
    .catch(err => {
      logger.error(`启用/禁用角色异常SQL ====== ${updateSQL}`)
      res.send(eMsg())
    })
}
module.exports = {
    addRoles,
    alterRoles,
    delRoles,
    rolesList,
    rolesAuth,
    rolesEnable
}