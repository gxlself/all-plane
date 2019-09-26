var express = require('express');
var router = express.Router();

router.post('/manage/register', function(req, res, next) {
  console.log(req)
  console.log(res)
  res.send('respond with a resource');
});

module.exports = router;
