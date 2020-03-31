const express = require('express');
const router = express.Router();
const { login } = require('../manage/login')
// 管理系统登录
router.post('/manage/login', login);

module.exports = router;
