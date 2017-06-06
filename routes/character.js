var express = require('express');
var router = express.Router();

var store = require('../store')

/* GET Characters listing. */
router.get('/:name', function(req, res, next) {
  res.render('character', {character:store.people.byName[req.params.name]})
  // res.send('respond with a resource');
});

module.exports = router;
