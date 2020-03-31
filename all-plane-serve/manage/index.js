/*
 * @Description: 管理系统路由index
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:02
 * @LastRditors: gxlself
 * @LastEditTime: 2020-03-31 18:26:00
 */

const express = require('express');
const router = express.Router();
const { addMenu, alterMenu, delMenu, menuList, menuEnable } = require('./menus')
const { addRoles, alterRoles, delRoles, rolesList, rolesAuth, rolesEnable } = require('./roles')
const { loginout } = require('./login')
const { userinfo } = require('./user')
const { permission } = require('./permission')
const { addMessage } = require('./article')

/* 登出 */
router.get('/loginout', loginout);
/* 获取权限 */
router.get('/permission', permission)
/* 获取用户信息 */
router.post('/user/info', userinfo)

/* 添加菜单 */
router.post('/menu/add', addMenu)
/* 修改菜单 */
router.post('/menu/alter', alterMenu)
/* 删除菜单 */
router.post('/menu/delete', delMenu)
/* 获取菜单列表 */
router.get('/menu/list', menuList) 
/* 启用/禁用菜单 */
router.post('/menu/updateEnable', menuEnable)

/* 添加角色 */
router.post('/roles/add', addRoles)
/* 修改角色 */
router.post('/roles/alter', alterRoles)
/* 删除角色 */
router.post('/roles/delete', delRoles)
/* 获取角色列表 */
router.get('/roles/list', rolesList) 
/* 角色授权 */
router.post('/roles/auth', rolesAuth)
/* 启用/禁用菜单 */
router.post('/roles/updateEnable', rolesEnable)

/* 新建公告 */
router.post('/message/addMessage', addMessage);


module.exports = router;
