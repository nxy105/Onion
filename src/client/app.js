'use strict';

/* App Module */

var onionApp = angular.module('onionApp', [
    'ngRoute',
    'timer',

    'ResponseHandler',
    'ResponseErrorHandler',

    'OnionControllers',
    'OnionServices',
    'PotatoServices'
]);

// set router
onionApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        title: 'Home',
        templateUrl: 'javascripts/view/app.html',
        controller: 'OnionIndexController'
    }).otherwise({
        redirectTo: '/'
    });
}]);

// set root scope title
onionApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

// register http response handler
angular.module('ResponseHandler', []).factory('ResponseHandler', ['$log', function($log) {
    return function(res, callback) {
        res = angular.fromJson(res);
        if (res.code === 0) {
            return callback(res.data);
        } else {
            // log error message and code
            $log.error(res);
        }
    };
}]);

// register http response error handler
angular.module('ResponseErrorHandler', []).factory('ResponseErrorHandler', ['$log', function($log) {
    return function(res, status) {
        $log.error(res, status);
    };
}]);