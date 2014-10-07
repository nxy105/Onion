/**
 * Controller index.
 */
var onion = require('../models/onion');

var controller = {};

controller.index = function(req, res) {

    // onion.createOnion({name: 'Joshua\'s onion'});

    res.render('index/index', {
        title: 'Onion',
        message: 'Create Success'
    });
};

module.exports = controller;