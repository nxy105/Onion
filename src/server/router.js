/**
 * Router
 */

var express = require('express');

// load controllers
var index = require('./controllers/index');
var onion = require('./controllers/onion');

var router = express.Router();

// add routes
router.get('/', index.index);

module.exports = router;