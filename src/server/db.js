/**
 * DB
 */
var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    when = require('when');

// connect to Mongo server
// var mongo = new MongoClient(new Server('localhost', 27017));
var dsn = 'mongodb://localhost:27017/test';
var db = {

    /**
     * getNextSequence
     *
     * @param  string collection collection name
     * @return integer
     */
    getNextSequence: function(db, collection) {
        return when.promise(function(resolve, reject) {
            db.collection('counters').findAndModify({ '_id': collection}
                , []
                , { '$inc': { 'seq': 1 } }
                , { 'new': true }
                , onResponse
            );

            function onResponse(err, result) {
                console.log(result.seq);
                resolve({ 'db': db, 'seq': result.seq });
            }
        });
    },

    /**
     * connect
     *
     * @return promise
     */
    connect: function() {
        return when.promise(function(resolve, reject) {
            MongoClient.connect(dsn, function(err, db) {
                if (err) {
                    reject(err);
                }

                resolve(db);
            });
        });
    },

    /**
     * insert
     *
     * @param  string collection collection name
     * @param  object data       data will be inserted
     * @return pormise
     */
    insert: function(collection, data) {
        var _this = this;
        return this.connect().then(function(db) {
            // get next seq id
            return _this.getNextSequence(db, collection);
        }).then(function(result) {
            var db = result.db
              , seq = result.seq;

            return when.promise(function(resolve, reject) {
                data._id = seq;
                db.collection(collection).insert(data, function(err, result) {
                    if (err) {
                        reject(err);
                    }

                    resolve(result[0]);
                });
            });
        });
    },

    /**
     * update
     *
     * @param  string collection collection name
     * @param  object query      query object
     * @param  object data       data will be updated
     * @return pormise
     */
    update: function(collection, query, data) {
        return this.connect().then(function(db) {
            return when.promise(function(resolve, reject) {
                db.collection(collection).update(query, { '$set': data }, function(err, result) {
                    if (err) {
                        reject(err);
                    }

                    resolve(result[0]);
                });
            });
        });
    },

    /**
     * remove
     *
     * @param  string collection collection name
     * @param  object query      query object
     * @return pormise
     */
    remove: function(collection, query) {
        return this.connect().then(function(db) {
            return when.promise(function(resolve, reject) {
                db.collection(collection).remove(query, function(err, result) {
                    if (err) {
                        reject(err);
                    }

                    resolve(result[0]);
                });
            });
        });
    },

    /**
     * find
     *
     * @param  string collection collection name
     * @param  object query      query object
     * @param  object fields     fields will return
     * @return pormise
     */
    find: function(collection, query, fields) {
        return this.connect().then(function(db) {
            return when.promise(function(resolve, reject) {
                db.collection(collection).find(query, fields ? fields : {}, function(err, result) {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
            });
        });
    },

    /**
     * findOne
     *
     * @param  string collection collection name
     * @param  object query      query object
     * @param  object fields     fields will return
     * @return pormise
     */
    findOne: function(collection, query, fields) {
        return this.connect().then(function(db) {
            return when.promise(function(resolve, reject) {
                db.collection(collection).findOne(query, fields ? fields : {}, function(err, result) {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
            });
        });
    }
};

module.exports = db;