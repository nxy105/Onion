/**
 * Controller potato.
 */
var onion = require('../models/onion')
  , api = {};

/**
 * list action
 */
api.list = function(req, res) {

    return {success: true};
};

/**
 * create action
 */
api.create = function(req, res, error, promise) {

    var title = req.param('title');

    if (!title) {
        throw error(501, 'error example');
    }

    return {success: true};
};

/**
 * update action
 */
api.update = function(req, res) {
};

/**
 * get action
 */
api.remove = function(req, res, error) {

    throw error(501, 'error example');
};

module.exports = api;