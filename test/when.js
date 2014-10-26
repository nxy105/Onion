/**
 * potato api test
 */
var assert = require('assert')
  , superagent = require('superagent')
  , when = require('when');

describe('When Test', function() {
    describe('Promise', function() {
        // test potato create
        it('Promise', function(done) {

            var promise1 = when.promise(function(resolve, reject) {
                console.log('start promise1');

                setTimeout(function() {
                    console.log('resolve promise1');
                    resolve('result1');
                }, 500);
            });

            var promise2 = promise1.then(function(result) {
                console.log('promise1 then');
                console.log('promise1 result ' + result);

                var promise = when.promise(function(resolve, reject) {
                    console.log('start promise2');

                    setTimeout(function() {
                        console.log('resolve promise2');
                        when.resolve('result2');
                    }, 500);
                });

                return promise;
            });

            var promise3 = promise2.then(function(result) {
                console.log('promise2 then');
                console.log('promise2 result ' + result);

                var promise = when.promise(function(resolve, reject) {
                    console.log('start promise3');

                    setTimeout(function() {
                        console.log('resolve promise3');
                        resolve('result2');
                    }, 500);
                });

                return promise;
            });
        });

        it('Promise multi', function(done) {

            when.promise(function(resolve, reject) {
                console.log('start promise1');

                setTimeout(function() {
                    console.log('resolve promise1');
                    resolve('result1');
                }, 500);
            }).then(function(result) {

                return when.promise(function(resolve, reject) {

                    setTimeout(function() {
                        console.log('resolve promise2');
                        resolve('result2');
                    }, 500);
                });
            }).then(function(result) {
                console.log(result);
            });
        });
    });
});