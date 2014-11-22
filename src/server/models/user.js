/**
 * Model user.
 */

var config = require('../../../config')
  , when = require('when');

var userModel = {

    /**
     * get by username and password
     * TODO here will be modified with query db
     *
     * @param  string username
     * @param  string password
     * @return promise
     */
    getByUsernameAndPassword: function(username, password) {
        return when.promise(function(resolve, reject) {
            var users, user;

            users = config.users;
            for (var i = 0; i < users.length; i ++) {
                user = users[i];
                if (username === user.username && password === user.password) {
                    return resolve(user);
                } else {
                    return resolve(false);
                }
            }
        });
    },

     /**
     * get by user id
     * TODO here will be modified with query db
     *
     * @param  integer  userId user id
     * @return promise
     */
    get: function(userId) {
        return when.promise(function(resolve, reject) {
            var users, user;

            users = config.users;
            for (var i = 0; i < users.length; i ++) {
                user = users[i];
                if (userId === user.userId) {
                    return resolve(user);
                } else {
                    return resolve(false);
                }
            }
        });
    },
};

module.exports = userModel;
