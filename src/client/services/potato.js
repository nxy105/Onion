/* Potato Services */

var PotatoServices = angular.module('PotatoServices', []);

// factory potato service
PotatoServices.factory('Potato', ['$http', 'ResponseHandler', 'ResponseErrorHandler', function($http, ResponseHandler, ResponseErrorHandler) {
    // return potato service instance
    return {
        'listAll': function(done) {
            $http.get('/potato/').success(function(res, status, headers, config) {
                ResponseHandler(res, done);
            }).error(function(res, status, headers, config) {
                ResponseErrorHandler(res, status);
            });
        }
    };
}]);