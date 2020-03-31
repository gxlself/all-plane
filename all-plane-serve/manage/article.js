const Base64 = require('js-base64').Base64
const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('message')

const addMessage = (req, res, next) => {
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
}

module.exports = {
  addMessage
}