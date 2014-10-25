/**
 * Model onion.
 */

var db = require('../db')
  , format = require('util').format;

var potatoModel = {

    STATUS: {
        'NORMAL': 1,
        'COMPLETE': 2
    },

    create: function(data) {
        return db.insert('potatos', 'potatoId', data);
    },

    update: function(potatoId, data) {
        return db.update('potatos', { 'potatoId': potatoId }, data);
    },

    list: function() {
        return db.findAll('potatos', { 'potatoId': potatoId });
    },

};

module.exports = potatoModel;
