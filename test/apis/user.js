/**
 * onion api test
 */
var assert = require('assert')
  , should = require('should')
  , superagent = require('superagent');

var domain = 'http://127.0.0.1:3000';

describe('API Test', function() {
    describe('User Module', function() {
        var agent = superagent.agent()
          , userId;

        // test user login
        it('user.login', function(done) {
            agent
                .post(domain + '/user/login')
                .send({ 'username': 'joshua', 'password': '123qaz' })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.have.property('userId', 1);
                data.should.have.property('username', 'joshua');

                userId = data.userId;
                return done();
            }
        });

        // test user login
        it('user.loginWithoutPassword', function(done) {
            agent
                .post(domain + '/user/login')
                .send({ 'username': 'joshua' })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text);

                data.code.should.eql(30001);

                return done();
            }
        });

        // test user login
        it('user.loginWithIncorrectPassword', function(done) {
            agent
                .post(domain + '/user/login')
                .send({ 'username': 'joshua', 'password': '1234qaz' })
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text);

                data.code.should.eql(30002);

                return done();
            }
        });

        // test user logout
        it('user.logout', function(done) {
            agent
                .post(domain + '/user/logout')
                .end(onResponse);

            function onResponse(err, res) {
                var data = JSON.parse(res.text).data;

                data.should.eql('ok');

                return done();
            }
        });
    });
});