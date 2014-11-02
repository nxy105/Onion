/**
 * Router
 */

var express = require('express')
  , router = express.Router()
  , api = require('../../lib/api');

// load controllers
var index = require('./controllers/index');

// load apis
var potato = require('./apis/potato');
var onion = require('./apis/onion');
var user = require('./apis/user');

// add controller routes
router.get('/', index.index);

// add api routes
router.get('/potato/', api.exec(potato.list));
router.post('/potato', api.exec(potato.create));
router.put('/potato/:potatoId', api.exec(potato.update));
router.delete('/potato/:potatoId', api.exec(potato.remove));

router.get('/onion/', api.exec(onion.list));
router.post('/onion', api.exec(onion.create));

router.post('/login', api.exec(user.login));
router.post('/logout', api.exec(user.logout));

module.exports = router;