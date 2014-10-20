/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = module.exports = express();

// set our default template engine to "jade"
// which prevents the need for extensions
app.set('view engine', 'jade');

// set views for error and 404 pages
app.set('views', __dirname + '/src/server/views');

// define a custom res.message() method
// which stores messages in the session
app.response.message = function(msg) {
    // reference `req.session` via the `this.req` reference
    var sess = this.req.session;
    // simply add the msg to an array for later
    sess.messages = sess.messages || [];
    sess.messages.push(msg);
    return this;
};

// log
if (!module.parent) {
    app.use(logger('dev'));
}

// serve static files
app.use(express.static(__dirname + '/public'));

// parse request bodies (req.body)
app.use(bodyParser.json());

// load session
app.use(require('./src/server/session'));

// load routes
app.use('/', require('./src/server/router'));

// server internal error
app.use(function(err, req, res, next) {
    // log it
    console.error(err.stack);
    // error page
    res.status(500).render('500');
});

// assume 404 since no middleware responded
app.use(function(req, res, next) {
    res.status(404).render('404', { url: req.originalUrl });
});

module.exports = app;