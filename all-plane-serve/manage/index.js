/*
 * @Description: 管理系统路由index
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:02
 * @LastRditors: gxlself
 * @LastEditTime: 2020-04-01 11:07:01
 */

const express = require('express');
const router = express.Router();
const { addMenu, alterMenu, delMenu, menuList, menuEnable, menuTreeData } = require('./menus')
const { addRoles, alterRoles, delRoles, rolesList, rolesAuth, rolesEnable } = require('./roles')
const { loginout } = require('./login')
const { userinfo } = require('./user')
const { permission } = require('./permission')
const { addArticle, updateArticle, deleteArticle, queryArticleList, articleDetail, changeStatus, addComment, deleteComment, changeCommentStatus } = require('./article')

/* 登出 */
router.get('/loginout', loginout);
/* 获取权限 */
router.get('/permission', permission)
/* 获取用户信息 */
router.post('/user/info', userinfo)

/* -----------菜单管理----------- */
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
/* 返回菜单树 */
router.get('/menu/treeData', menuTreeData)

/* -----------角色管理----------- */
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

/* -----------文章管理----------- */
/* 新建文章 */
router.post('/article/create', addArticle);
/* 编辑文章 */
router.post('/article/update', updateArticle);
/* 删除文章 */
router.get('/article/delete', deleteArticle);
/* 查询文章 */
router.post('/article/list', queryArticleList);
/* 文章详情 */
router.get('/article/detail', articleDetail);
/* 文章状态 */
router.post('/article/changeStatus', changeStatus);
/* 新增评论 */
router.post('/article/addComment', addComment);
/* 删除评论 */
router.get('/article/deleteComment', deleteComment);
/* 评论状态 */
router.post('/article/changeCommentStatus', changeCommentStatus);


module.exports = router;
