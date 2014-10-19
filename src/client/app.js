'use strict';

/* App Module */

var onionApp = angular.module('onionApp', [
    'ngRoute',

    'OnionControllers'
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