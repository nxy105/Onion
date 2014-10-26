/**
 * DB
 */
var MongoClient = require('mongodb').MongoClient
  , when = require('when');

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
            db.collection('counters').findAndModify({ '_id': collection }
                , []
                , { '$inc': { 'seq': 1 } }
                , { 'new': true }
                , onResponse
            );

            function onResponse(err, result) {
                resolve({ 'db': db, 'seq': result.seq });
            }
        });
    },

    /**
     * connect to MongoDB server
     *
     * @return promise
     */
    connect: function() {
        return when.promise(function(resolve, reject) {
            MongoClient.connect(dsn, function(err, db) {
                return err ? reject(err) : resolve(db);
            });
        });
    },

    /**
     * insert
     *
     * @param  string collection collection name
     * @param  string pk         primary key field name
     * @param  object data       data will be inserted
     * @return pormise
     */
    insert: function(collection, pk, data) {
        var _this = this;
        return this.connect().then(function(db) {
            // get next seq id
            return _this.getNextSequence(db, collection);
        }).then(function(result) {
            var db = result.db
              , seq = result.seq;

            return when.promise(function(resolve, reject) {
                // set unique id into pk field
                data[pk] = seq;
                db.collection(collection).insert(data, function(err, records) {
                    return err ? reject(err) : resolve(records[0]);
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
                db.collection(collection).update(query
                    , { '$set': data }
                    , onResponse);

                function onResponse(err, updatedCount) {
                    return err ? reject(err) : resolve(updatedCount);
                }
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
                db.collection(collection).remove(query, onResponse);

                function onResponse(err, result) {
                    return err ? reject(err) : resolve(result[0]);
                }
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
                db.collection(collection).find(query
                    , fields ? fields : {}
                    , onResponse
                );

                function onResponse(err, result) {
                    return err ? reject(err) : resolve(result);
                }
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
                db.collection(collection).findOne(query
                    , fields ? fields : {}
                    , onResponse
                );

                function onResponse(err, result) {
                    return err ? reject(err) : resolve(result);
                }
            });
        });
    }
};

module.exports = db;