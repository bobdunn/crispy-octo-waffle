var express = require('express');
var router = express.Router();

var store = require('../store')

router.get('/', function(req, res, next) {
  res.send(store.planetResidents);
});

module.exports = router;
