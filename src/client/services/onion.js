/* Onion Services */

var OnionServices = angular.module('OnionServices', []);

// factory potato service
OnionServices.factory('Onion', ['$http', 'ResponseHandler', 'ResponseErrorHandler', function($http, ResponseHandler, ResponseErrorHandler) {
    // return potato service instance
    return {
        'listAll': function(done) {
            $http.get('/onion/').success(function(res, status, headers, config) {
                ResponseHandler(res, done);
            }).error(function(res, status, headers, config) {
                ResponseErrorHandler(res, status);
            });
        },
    };
}]);