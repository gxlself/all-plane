const express = require('express');
const router = express.Router();
const Base64 = require('js-base64').Base64;
const { sqlTodo } = require('../utils/sql');
const { currentTime, checkString, checkNumber, completeMenus } = require('../utils/util')
const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('manage')

/* 登出 */
router.get('/loginout', function(req, res, next) {
  var requestAuthorization = req.headers.authorization.split(',')[0]
  var requestUsername = req.headers.authorization.split(',')[1]
  const delDataSql = `DELETE FROM m_token WHERE token='${requestAuthorization}' && username='${requestUsername}'`
  sqlTodo(delDataSql)
    .then(result => {
      res.send(sMsg(null, 'loginout is success'));
    })
    .catch(err => {
      res.send(eMsg());
    })
});
/* 获取权限 */
router.get('/permission', (req, res, next) => {
  res.send(sMsg())
})

/* 添加菜单 */
router.post('/menu/add', (req, res, next) => {
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
})
/* 修改菜单 */
router.post('/menu/alter', (req, res, next) => {
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
})
/* 删除菜单 */
router.post('/menu/delete', (req, res, next) => {
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
})
/* 获取菜单列表 */
router.get('/menu/list', (req, res, next) => {
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
  console.log('listSql', listSql)
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
}) 
/* 启用/禁用菜单 */
router.post('/menu/updateEnable', (req, res, next) => {
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
})

/* 添加角色 */
router.post('/roles/add', (req, res, next) => {
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
})
/* 修改角色 */
router.post('/roles/alter', (req, res, next) => {
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
})
/* 删除角色 */
router.post('/roles/delete', (req, res, next) => {
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
})
/* 获取角色列表 */
router.get('/roles/list', (req, res, next) => {
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
}) 
/* 角色授权 */
router.post('/roles/auth', (req, res, next) => {
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
})

/* 新建公告 */
router.post('/message/addMessage', (req, res, next) => {
  const { title, theme, content, status, username } = req.body
  if (!checkString(title)) {
    res.send(eMsg('title must be string'))
    return
  }
  if (!checkString(theme)) {
    res.send(eMsg('theme must be string'))
    return
  }
  if (!checkString(content)) {
    res.send(eMsg('content must be string'))
    return
  }
  if (!checkNumber(status)) {
    res.send(eMsg('status is invalid'))
    return
  }
  let _title = Base64.encode(req.body.title)
  let _theme = Base64.encode(req.body.theme)
  let _content = Base64.encode(req.body.content)
  let create_date = currentTime()
  let last_modify = currentTime()
  const saveMessageSql = `INSERT INTO m_message (title, theme, content, status, create_user, create_date, last_modify) VALUES('${_title}', '${_theme}', '${_content}', ${Number(status)}, '${username}', '${create_date}', '${last_modify}')`
  logger.trace(`新建公告SQL ====== ${saveMessageSql}`)
  sqlTodo(saveMessageSql)
    .then(result => {
      res.send(sMsg(null, '保存成功'))
    })
    .catch(err => {
      logger.error(`新建公告异常 ====== ${err.message}`)
      res.send(eMsg('保存失败'))
    })
});
module.exports = router;
