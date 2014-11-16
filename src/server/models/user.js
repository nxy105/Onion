/**
 * Model user.
 */

var db = require('../db')
  , when = require('when');

var userModel = {

    /**
     * get by username and password
     * TODO here will be modified with query db
     *
     * @param  string username
     * @param  string password
     * @return object
     */
    getByUsernameAndPassword: function(username, password) {
        return when.promise(function(resolve, reject) {
            if (username == 'joshua' && password == '123qaz') {
                return resolve({ username: username, userId: 1 });
            } else {
                return resolve(null);
            }
        });
    },
};

module.exports = userModel;
