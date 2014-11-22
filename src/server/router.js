/**
 * Router
 */

var express = require('express')
  , router = express.Router()
  , api = require('../../lib/api');

// load controllers
var index = require('./controllers/index')
  , user = require('./controllers/user');

// load apis
var potato = require('./apis/potato')
  , onion = require('./apis/onion');

// add controller routes
router.get('/', index.index);
router.get('/login', user.login);
router.post('/login', user.processLogin);
router.get('/logout', user.logout);

// add api routes
router.get('/potato/', api.exec(potato.list));
router.post('/potato', api.exec(potato.create));
router.put('/potato/:potatoId', api.exec(potato.update));
router.delete('/potato/:potatoId', api.exec(potato.remove));

router.get('/onion/', api.exec(onion.list));
router.post('/onion', api.exec(onion.create));

module.exports = router;