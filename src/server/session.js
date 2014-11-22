/**
 * Session
 */

var app = require('../../app')
  , session = require('express-session')
  , config = require('../../config');

// session support
app.use(session({
    resave: true,
    secret: config.session.secret,
    cookie: { maxAge: 60000 },
    saveUninitialized: true
}));

module.exports = {

    /**
     * check if user login
     *
     * @param  object req  request object
     * @return void
     */
    checkUserLogin: function(req) {
        return req.session.userId ? true : false;
    },

    /**
     * get loginned user login
     *
     * @param  object req  request object
     * @return void
     */
    getLoginnedUserId: function(req) {
        return req.session.userId;
    },

    /**
     * clear user login status
     *
     * @param  object req  request object
     * @return void
     */
    clearUserLogin: function(req) {
        return req.session.userId = 0;
    },

    /**
     * set user login status
     *
     * @param  object  req    request object
     * @param  integer userId user id
     * @return void
     */
    setUserLogin: function(req, userId) {
        return req.session.userId = userId;
    },
};
