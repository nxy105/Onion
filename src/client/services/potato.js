/* Potato Services */

var PotatoServices = angular.module('PotatoServices', []);

// factory potato service
PotatoServices.factory('Potato', ['$http', 'ResponseHandler', 'ResponseErrorHandler', function($http, ResponseHandler, ResponseErrorHandler) {
    // return potato service instance
    return {
        'create': function(newPotato, done) {
            $http.post('/potato', newPotato).success(function(res, status, headers, config) {
                ResponseHandler(res, done);
            }).error(function(res, status, headers, config) {
                ResponseErrorHandler(res, status);
            });
        },

        /**
         * listAll
         *
         * @param  function done
         * @return void
         */
        'listAll': function(done) {
            $http.get('/potato/').success(function(res, status, headers, config) {
                ResponseHandler(res, done);
            }).error(function(res, status, headers, config) {
                ResponseErrorHandler(res, status);
            });
        },

        /**
         * remove
         *
         * @param  integer  potatoId  potato id
         * @param  function done
         * @return void
         */
        'remove': function(potatoId, done) {
            $http.delete('/potato/' + potatoId).success(function(res, status, headers, config) {
                ResponseHandler(res, done);
            }).error(function(res, status, headers, config) {
                ResponseErrorHandler(res, status);
            });
        }
    };
}]);