/**
 * Model onion.
 */

var db = require('../db')
  , format = require('util').format;

var onionModel = {

    create: function(data) {
        return db.insert('onion', data);
    },

    list: function(onionId) {
        return db.findOne('onion', { 'onionId': onionId });
    }
};

module.exports = onionModel;
