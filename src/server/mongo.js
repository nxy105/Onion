/**
 * DB
 */
var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

// connect to Mongo server
var mongo = new MongoClient(new Server('localhost', 27017));

module.exports = mongo;