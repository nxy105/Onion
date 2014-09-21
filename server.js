var express = require('express');
var app = express();

// set view path and view engine
app.set('views', './core/frontend/views/');
app.set('view engine', 'hbs');

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});