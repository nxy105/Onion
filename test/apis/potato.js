/**
 * potato api test
 */
var assert = require('assert')
  , should = require('should')
  , superagent = require('superagent');

var domain = 'http://127.0.0.1:3000';

describe('API Test', function() {
    describe('Potato Module', function() {
        var agent = superagent.agent()
          , potatoId;

        // test potato create
        it('potato.create', function(done) {
            agent
                .post(domain + '/potato')
                .send({ 'title': 'My first potato' })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.have.property('title', 'My first potato');
                data.should.have.property('createdById', 1);
                data.should.have.property('status', 'normal');

                potatoId = data.potatoId;
                return done();
            }
        });

        // test potato update
        it('potato.update', function(done) {
            agent
                .put(domain + '/potato/' + potatoId)
                .send({ 'title': 'My first potato which be updated', 'status': 'complete'})
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.have.property('title', 'My first potato which be updated');
                data.should.have.property('createdById', 1);
                data.should.have.property('status', 'complete');

                return done();
            }
        });
    });
});