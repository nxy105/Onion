/**
 * Model onion.
 */

var db = require('../db')
  , format = require('util').format;

var potatoModel = {

    STATUS: {
        'NORMAL': 'normal',
        'COMPLETE': 'complete'
    },

    /**
     * get
     *
     * @param  integer potatoId  potato id
     * @return promise
     */
    get: function(potatoId) {
        return db.findOne('potatos', { 'potatoId': potatoId });
    },

    /**
     * create
     *
     * @param  object data  potato data
     * @return promise
     */
    create: function(data) {
        return db.insert('potatos', 'potatoId', data);
    },

    /**
     * update
     *
     * @param  integer potatoId  potato id
     * @param  object  data      potato data
     * @return promise
     */
    update: function(potatoId, data) {
        return db.update('potatos', { 'potatoId': potatoId }, data);
    },

    /**
     * create
     *
     * @param  object data  potato data
     * @return promise
     */
    list: function() {
        return db.findAll('potatos', { 'potatoId': potatoId });
    },

};

module.exports = potatoModel;
