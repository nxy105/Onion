/**
 * Controller potato.
 */
var onion = require('../models/onion')
  , potato = require('../models/potato')
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
        return when.reject(error(501, 'error example'));
    }

    return onion.create({ title: title });
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