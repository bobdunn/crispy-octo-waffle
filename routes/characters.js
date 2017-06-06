var express = require('express');
var router = express.Router();



var store = require('../store')
var _ = require('lodash')

router.get('/', function(req, res, next) {
  let people;
  if(
    req.query.sort === 'name'
    || req.query.sort === 'mass'
    || req.query.sort === 'height'
  ){
    people = _(store.people.list).sortBy([req.query.sort]).take(50)
  } else {
    people = _.take(store.people.list, 50)
  }
  res.send(people);
});

module.exports = router;
