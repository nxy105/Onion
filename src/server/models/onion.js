/**
 * Model onion.
 */

var db = require('../db')
  , format = require('util').format;

var onionModel = {

    create: function(data) {
        return db.insert('onion', data);
    },

    update: function(onion, data) {
        return db.update('onion', onion._id, data);
    },

    get: function(onionId) {
        return db.findOne('onion', { 'onionId': onionId });
    },

    
};

// create a new onion
onionModel.create = function(data) {
    return db.insert('onion', data);
};

module.exports = onionModel;
