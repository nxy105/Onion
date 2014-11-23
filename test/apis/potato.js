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

        before(loginUser(agent));

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
                // console.log('potato id is ' + potatoId);
                return done();
            }
        });

        // test potato create
        it('potato.createWithInvalidTitle', function(done) {
            agent
                .post(domain + '/potato')
                .send({ 'title': '' })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text);

                data.code.should.eql(10001);

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

        // test potato remove
        it('potato.remove', function(done) {
            agent
                .del(domain + '/potato/' + potatoId)
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.eql('ok');

                return done();
            }
        });

        // test potato preList
        it('potato.preList', function(done) {
            agent
                .post(domain + '/potato')
                .send({ 'title': 'My first potato 2' })
                .end(onResponse);

            function onResponse(err, res) {
                return done();
            }
        });

        // test potato list
        it('potato.list', function(done) {
            agent
                .get(domain + '/potato/')
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.be.type('object');
                data.length.should.greaterThan(0);
                data[0].should.have.property('title', 'My first potato 2');
                data[0].should.have.property('createdById', 1);
                data[0].should.have.property('status', 'normal');

                return done();
            }
        });

        // test potato update
        it('potato.updateNotExistPotato', function(done) {
            agent
                .put(domain + '/potato/99999999999999')
                .send({ 'title': 'My first potato which be updated', 'status': 'complete'})
                .end(onResponse);

            function onResponse(err, res) {
                return done();
            }
        });
    });
});

function loginUser(agent) {
    return function(done) {
        agent
            .post(domain + '/login')
            .send({ username: 'test', password: '1' })
            .end(onResponse);

        function onResponse(err, res) {
            return done();
        }
    };
}