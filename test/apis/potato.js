/**
 * potato api test
 */
var assert = require('assert')
  , superagent = require('superagent');

var domain = 'http://127.0.0.1:3000';

describe('API Test', function() {
    describe('Potato Module', function() {
        var agent = superagent.agent();

        // test potato create
        it('potato.create', function(done) {
            agent
                .post(domain + '/potato')
                .send({ title: 'My first potato' })
                .end(onResponse);

            function onResponse(err, res) {
                return done();
            }
        });
    });
});