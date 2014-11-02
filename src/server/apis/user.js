/**
 * Controller onion.
 */
var moment = require('moment')
  , userModel = require('../models/user')
  , validator = require('../../../lib/validator');

var userApi = {

    /**
     * login
     *
     * @param  object   req   req   object
     * @param  object   res   res   object
     * @param  function error error function which create error object
     * @param  function next  next  function
     * @return promise
     */
    login: function(req, res, error, next) {
        var username, password;

        username = validator.toString(req.param('username'));
        password = validator.toString(req.param('password'));

        if (!checkUserInfo(username, password)) {
            return error(30001, 'Both username and password are required');
        }

        return userModel.getByUsernameAndPassword(username, password).then(function(user) {
            // can not find the user
            if (!user) {
                return error(30002, 'username or password is invalid');
            }

            // set session
            req.session.userId = user.userId;

            return next(user);
        });
    },

    /**
     * create a potato
     *
     * @param  object   req    req object
     * @param  object   res    res object
     * @param  function error  error function which create error object
     * @param  function next   next function
     * @return promise
     */
    logout: function(req, res, error, next) {
        req.session.userId = 0;

        return next('ok');
    },
};

/**
 * check user info
 *
 * @param  string username
 * @param  string password
 * @return boolean
 */
function checkUserInfo(username, password) {
    return validator.isRequired(username) && validator.isRequired(password);
}

module.exports = userApi;