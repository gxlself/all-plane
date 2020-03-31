/*
 * @Description: SQL封装
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-03-30 10:53:02
 */

const mysql = require('mysql');
const { sql } = require('../config/config')

// 查询
const sqlTodo = (sqlSentence) => {
  return new Promise((resolve, reject) => {
    // 实例连接数据库
    const connection = mysql.createConnection(sql)
    connection.connect();
    connection.query(sqlSentence, (error, results, fields) => {
      if (error) {
        reject(error)
      } else {
        resolve(results, fields)
      }
      connection.end();
    })
  })
}
module.exports = {
  sqlTodo
}