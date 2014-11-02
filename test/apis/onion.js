/**
 * onion api test
 */
var assert = require('assert')
  , should = require('should')
  , superagent = require('superagent');

var domain = 'http://127.0.0.1:3000';

describe('API Test', function() {
    describe('Onion Module', function() {
        var agent = superagent.agent()
          , onionId, potatoId;

        // test potato create
        it('onion.createPotato', function(done) {
            agent
                .post(domain + '/potato')
                .send({ 'title': 'Test onion create' })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;
                potatoId = data.potatoId;
                return done();
            }
        });

        // test onion create
        it('onion.create', function(done) {
            agent
                .post(domain + '/onion')
                .send({ 'createdOn': '2014-11-02 11:00:00', 'potatoId': potatoId })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.have.property('createdOn', '2014-11-02 11:00:00');
                data.should.have.property('potatoId', potatoId);
                data.should.have.property('completedOn');

                onionId = data.onionId;
                return done();
            }
        });

        // test onion create
        it('onion.createWithIncorrectCreatedOn', function(done) {
            agent
                .post(domain + '/onion')
                .send({ 'createdOn': 99999, 'potatoId': potatoId })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text);

                data.code.should.eql(20002);

                return done();
            }
        });

        // test onion create
        it('onion.createWithLaterCreatedOn', function(done) {
            agent
                .post(domain + '/onion')
                .send({ 'createdOn': '2050-11-02 11:00:00', 'potatoId': potatoId })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text);

                data.code.should.eql(20002);

                return done();
            }
        });

        // test onion create
        it('onion.list', function(done) {
            agent
                .get(domain + '/onion/')
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.be.type('object');
                data.length.should.greaterThan(0);

                data[0].should.have.property('createdOn', '2014-11-02 11:00:00');
                data[0].should.have.property('potatoId', potatoId);
                data[0].should.have.property('completedOn');

                return done();
            }
        });
    });
});