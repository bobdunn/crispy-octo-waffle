var express = require('express');
var router = express.Router();

/* GET Characters listing. */
router.get('/:name', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
