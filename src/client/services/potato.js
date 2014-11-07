/* Onion Services */

var PotatoServices = angular.module('PotatoServices', []);

// factory potato service
PotatoServices.factory('Potato', ['$http', function($http) {
    // create potato service instance
    var potato = {
        'listAll': function(done) {
            $http.get('/potato/').success(function(res, status, headers, config) {
                res = angular.fromJson(res);
                if (res.code === 0) {
                    return done(res.data);
                }
            }).error(function(res, status, headers, config) {

            });
        }
    };

    // return service instance
    return potato;
}]);