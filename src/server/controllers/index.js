/**
 * Controller index.
 */
var onion = require('../models/onion')
  , controller = {};

/**
 * index action
 */
controller.index = function(req, res) {

    var userId = req.session.userId;

    res.render('index/index', {stream : JSON.stringify({ userId: userId })});
};

module.exports = controller;