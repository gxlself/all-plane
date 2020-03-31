const { sqlTodo } = require('../utils/sql');
const { checkString, checkNumber, completeMenus } = require('../utils/util')
const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('roles')


const addRoles = function(req, res, next) {
  const { name, remark } = req.body
  if (!checkString(name)) {
    res.send(eMsg('name is invalid'))
    return
  }
  const sql = `INSERT INTO m_roles (role_name, remark) VALUES('${name}', '${remark}');`
  sqlTodo(sql)
    .then(result => {
      res.send(sMsg())
    })
    .catch(err => {
      logger.error(`添加角色异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}
const alterRoles = function(req, res, next) {
  const { name, remark, id } = req.body
  if (!checkString(name)) {
    res.send(eMsg('name is invalid'))
    return
  }
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  const sql = `UPDATE m_roles SET role_name='${name}',remark='${remark}' WHERE id=${Number(id)}`
  sqlTodo(sql)
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
const delRoles = function(req, res, next) {
  const { id } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  const sql = `DELETE FROM m_roles WHERE id=${Number(id)}`
  sqlTodo(sql)
    .then(result => {
      res.send(sMsg())
    })
    .catch(err => {
      logger.error(`删除角色异常 ====== ${err.message}`)
      res.send(eMsg('删除失败'))
    })
}
const rolesList = function(req, res, next) {
  const listSql = `SELECT * FROM m_roles`
  sqlTodo(listSql)
    .then(result => { 
      completeMenus(result)
        .then(list => {
          res.send(sMsg({list})); 
        })
        .catch(err => {
          logger.error(`获取角色列表异常-completeMenus ====== ${err.message}`);
          res.send(eMsg()); 
        })
      
    }) 
    .catch(err => { 
      logger.error(`获取角色列表异常 ====== ${err.message}`);
      logger.error(`获取角色列表listSql ====== ${listSql}`);
      res.send(eMsg()); 
    });
  data = null;
}
const rolesAuth = function(req, res, next) {
  const { menus, id } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id is invalid'))
    return
  }
  const sql = `UPDATE m_roles SET menus='${menus}' WHERE id=${Number(id)}`
  sqlTodo(sql)
    .then(result => {
      if (result.affectedRows === 0) {
        logger.error(`角色授权未修改异常 ====== 未操作成功`)
        logger.error(`角色授权未修改sql ====== ${sql}`)
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
module.exports = {
    addRoles,
    alterRoles,
    delRoles,
    rolesList,
    rolesAuth
}