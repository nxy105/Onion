/**
 * Session
 */

var app = require('../../app');
var session = require('express-session');

// session support
app.use(session({
    resave: true,
    secret: 'some secret here',
    cookie: { maxAge: 60000 },
    saveUninitialized: true
}));

/**
 * checkUserLogin
 */
var checkUserLogin = function(session) {
    return session.userId ? true : false;
}

// verify session
module.exports = function(req, res, next) {

    var session = req.session;

    // fake user id instead
    session.userId = 1;

    if (!checkUserLogin(session)) {
        // if request / will not return a json data
        if (req.path == '/') {
            next();
        } else {
            res.type('application/json').json({ 'code': 100, 'msg': 'Not login yet' });
        }
    } else {
        next();
    }
};
