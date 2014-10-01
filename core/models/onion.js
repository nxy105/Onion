/**
 * Model onion.
 */

var mongo = require('../mongo'),
    format = require('util').format;

var model = {};

// create a new onion
model.createOnion = function(data) {
    // open a db connection
    mongo.open(function(err, mongo) {
        var db = mongo.db('test');
        var collection = db.collection('example');
        collection.insert(data);
        mongo.close();
    });
};

module.exports = model;
