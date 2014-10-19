/**
 * Controller potato.
 */
var onion = require('../models/onion')
  , api = {};

/**
 * get action
 */
api.get = function(req, res, error) {

    throw error(501, 'error example');
};

/**
 * create action
 */
api.create = function(req, res) {
};

/**
 * update action
 */
api.update = function(req, res) {
};

/**
 * list action
 */
api.list = function(req, res) {

    return {success: true};
};

module.exports = api;