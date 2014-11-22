/**
 * Controller index.
 */
var validator = require('../../../lib/validator')
  , session = require('../session')
  , userModel = require('../models/user')
  , userController;

userController = {

    /**
     * login
     *
     * @param  object  req  request object
     * @param  object  res  response object
     * @return void
     */
    login: function(req, res) {
        if (session.checkUserLogin(req)) {
            return res.redirect('/');
        }

        return res.render('portal/login');
    },

    /**
     * process login
     *
     * @param  object  req  request object
     * @param  object  res  response object
     * @return void
     */
    processLogin: function(req, res) {
        var username, password;

        username = validator.toString(req.param('username'));
        password = validator.toString(req.param('password'));

        if (!checkUserInfo(username, password)) {
            return res.redirect('/login');
        }

        return userModel.getByUsernameAndPassword(username, password).then(function(user) {
            // can not find the user
            if (!user) {
                return res.redirect('/login');
            }

            // set user login
            session.setUserLogin(req, user.userId);

            return res.redirect('/');
        });
    },

    /**
     * logout
     *
     * @param  object  req  request object
     * @param  object  res  response object
     * @return void
     */
    logout: function(req, res) {
        session.clearUserLogin(req);

        return res.redirect('/login');
    }
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

module.exports = userController;