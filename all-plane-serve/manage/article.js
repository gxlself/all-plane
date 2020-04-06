const Base64 = require('js-base64').Base64
const { sMsg, eMsg } = require('../utils/send')
const logger = require('../utils/log').useLog('article')

/**
 * @description: 添加文章
 */
const addArticle = (req, res, next) => {
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
  let _content = Base64.encode(content)
  let create_date = currentTime()
  let last_modify = currentTime()
  const saveArticleSQL = `INSERT INTO m_article (title, theme, content, status, create_user, create_date, last_modify) VALUES('${title}', '${theme}', '${_content}', ${Number(status)}, '${username}', '${create_date}', '${last_modify}')`
  logger.trace(`新建文章SQL ====== ${saveArticleSQL}`)
  sqlTodo(saveArticleSQL)
    .then(result => {
      res.send(sMsg(null, '保存成功'))
    })
    .catch(err => {
      logger.error(`新建文章异常SQL ====== ${saveArticleSQL}`)
      logger.error(`新建文章异常 ====== ${err.message}`)
      res.send(eMsg('保存失败'))
    })
}

/**
 * @description: 编辑文章
 */
const updateArticle = (req, res, next) => {
  const { id, title, theme, content } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id must be Number'))
    return
  }
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
  let _content = Base64.encode(content)
  let last_modify = currentTime()
  const updateSQL = `UPDATE m_article SET title='${title}',theme='${theme}',content='${_content}',last_modify=${last_modify} WHERE id=${Number(id)}`
  sqlTodo(updateSQL)
    .then(result => {
      res.send(sMsg())
    }).catch(err => {
      logger.error(`编辑文章异常SQL ====== ${updateSQL}`)
      logger.error(`编辑文章异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 删除文章
 */
const deleteArticle = (req, res, next) => {
  const { id } = req.query
  if (!checkNumber(id)) {
    res.send(eMsg('id must be Number'))
    return
  }
  const delteSQL = `DELETE FROM m_article WHERE id=${Number(id)}`
  sqlTodo(delteSQL)
    .then(result => {
      res.send(sMsg())
    }).catch(err => {
      logger.error(`删除文章异常SQL ====== ${delteSQL}`)
      logger.error(`删除文章异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 文章列表
 */
const queryArticleList = (req, res, next) => {
  const { page, size, title, theme } = req.body
  if (!checkNumber(page)) {
    res.send(eMsg('page must be Number'))
    return
  }
  if (!checkNumber(size)) {
    res.send(eMsg('size must be Number'))
    return
  }
  const querySQL = `SELECT title,theme,create_date,username FROM m_article WHERE page=${Number(page)} AND size=${Number(size)} AND title LIKE '%${title || ''}%' AND theme LIKE '%${theme || ''}%'`
  const countSQL = `SELECT COUNT(*) AS count FROM m_article`
  Promise.all([sqlTodo(querySQL), sqlTodo(countSQL)])
    .then(values => {
      const list = values[0]
      const count = values[1][0].count
      res.send({list, count})
    })
    .catch(err => {
      logger.error(`查询文章异常listSQL ====== ${querySQL}`)
      logger.error(`查询文章异常countSQL ====== ${countSQL}`)
      logger.error(`查询文章异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 文章详情
 */
const articleDetail = (req, res, next) => {
  const {id} = req.query
  if (!checkNumber(id)) {
    res.send(eMsg('id must be Number'))
    return
  }
  const detailSQL = `SELECT * FROM m_article WHERE id=${Number(id)}`
  sqlTodo(detailSQL)
    .then(result => {
      res.send(sMsg({detail: result[0]}))
    })
    .catch(err => {
      logger.error(`文章详情异常SQL ====== ${detailSQL}`)
      logger.error(`文章详情异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 修改文章状态
 */
const changeStatus = (req, res, next) => {
  const { id, status } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id must be Number'))
    return
  }
  if (!checkNumber(status)) {
    res.send(eMsg('status must be Number'))
    return
  }
  const changeSQL = `UPDATE m_article SET status=${Number(status)} WHERE id=${Number(id)}`
  sqlTodo(changeSQL)
    .then(result => {
      res.send(sMsg())
    })
    .catch(err => {
      logger.error(`修改文章状态异常SQL ====== ${changeSQL}`)
      logger.error(`修改文章状态异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 添加评论
 */
const addComment = (req, res, next) => {
  const { remark, images, username, article_id } = req.body
  if (!checkString(remark)) {
    res.send(eMsg('remark must be string'))
    return
  }
  if (!checkNumber(article_id)) {
    res.send(eMsg('article_id must be Number'))
    return
  }
  let create_date = currentTime()
  const addCommentSQL = `INSERT INTO m_article_comment (article_id, remark, images, username, create_date) VALUES(${Number(article_id)}, '${remark}', '${images}', '${username}', '${create_date}')`
  logger.trace(`添加评论SQL ====== ${addCommentSQL}`)
  sqlTodo(addCommentSQL)
    .then(result => {
      res.send(sMsg())
    })
    .catch(err => {
      logger.error(`添加评论异常SQL ====== ${addCommentSQL}`)
      logger.error(`添加评论异常 ====== ${err.message}`)
      res.send(eMsg('保存失败'))
    })
}

/**
 * @description: 删除评论
 */
const deleteComment = (req, res, next) => {
  const { id } = req.query
  if (!checkNumber(id)) {
    res.send(eMsg('id must be Number'))
    return
  }
  const delteSQL = `DELETE FROM m_article_comment WHERE id=${Number(id)}`
  sqlTodo(delteSQL)
    .then(result => {
      res.send(sMsg())
    }).catch(err => {
      logger.error(`删除评论异常SQL ====== ${delteSQL}`)
      logger.error(`删除评论异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

/**
 * @description: 修改评论状态
 */
const changeCommentStatus = (req, res, next) => {
  const { id, status } = req.body
  if (!checkNumber(id)) {
    res.send(eMsg('id must be Number'))
    return
  }
  if (!checkNumber(status)) {
    res.send(eMsg('status must be Number'))
    return
  }
  const changeSQL = `UPDATE m_article_comment SET status=${Number(status)} WHERE id=${Number(id)}`
  sqlTodo(changeSQL)
    .then(result => {
      res.send(sMsg())
    })
    .catch(err => {
      logger.error(`修改评论状态异常SQL ====== ${changeSQL}`)
      logger.error(`修改评论状态异常 ====== ${err.message}`)
      res.send(eMsg())
    })
}

module.exports = {
  addArticle,
  updateArticle,
  deleteArticle,
  queryArticleList,
  articleDetail,
  changeStatus,
  addComment,
  deleteComment,
  changeCommentStatus
}