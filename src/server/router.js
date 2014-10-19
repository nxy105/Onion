/**
 * Router
 */

var express = require('express')
  , router = express.Router()
  , api = require('../../lib/api');

// load controllers
var index = require('./controllers/index');

// load apis;
var potato = require('./apis/potato');

// add controller routes
router.get('/', index.index);

// add api routes
router.get('/potato/', api.exec(potato.list));
router.get('/potato/:potatoId', api.exec(potato.get));

module.exports = router;