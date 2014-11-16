/**
 * Model onion.
 */

var db = require('../db');

var onionModel = {

    /**
     * create a onion.
     *
     * @param  object data  onion data
     * @return promise
     */
    create: function(data) {
        return db.insert('onions', 'onionId', data);
    },

    /**
     * list normal onion.
     *
     * @param  integer createdById  create by user id
     * @return promise
     */
    list: function(createdById) {
        var options, conditions;

        conditions = {
            'createdById': createdById,
        };

        options = {
            'limit': 15,
            'sort': [['completedOn', 'desc'], ['onionId', 'desc']]
        };

        return db.find('onions', conditions, {}, options);
    }
};

module.exports = onionModel;
