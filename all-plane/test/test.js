const { completeMenus } = require('../utils/util')
const { sqlTodo } = require('../utils/sql')
const rolesSQL = `SELECT * FROM m_roles WHERE id=2;`
sqlTodo(rolesSQL)
	.then(result => {
		// console.log('menus', JSON.parse(result[0].menus))
		completeMenus(JSON.parse(result[0].menus), true)
			.then(res => {
				// console.log('=====================')
				// console.log(res)
			})
			.catch(err => {
				console.log('completeMenus is error ', err)
			})
	})
	.catch(err => {	
		console.log('出错了', err)
	})