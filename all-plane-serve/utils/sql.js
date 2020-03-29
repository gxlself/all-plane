const mysql = require('mysql');
const { sql } = require('../config/config')

// 查询
const sqlTodo = function(sqlSentence) {
  return new Promise(function(resolve, reject) {
    // 实例连接数据库
    const connection = mysql.createConnection(sql)
    connection.connect();
    connection.query(sqlSentence, function (error, results, fields) {
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