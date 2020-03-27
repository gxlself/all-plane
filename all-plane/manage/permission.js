// {sqlTodo, sMsg, eMsg, perLogger, req, res, next}
module.exports = {
  permission(setObj) {
    const {sqlTodo, sMsg, eMsg, perLogger, req, res, next} = setObj
    res.send(sMsg())
  }
}
