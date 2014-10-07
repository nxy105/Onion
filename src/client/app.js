'use strict';

/* App Module */

var onionApp = angular.module('onionApp', [
    'ngRoute',

    'OnionControllers'
]);

onionApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'javascripts/view/app.html',
        controller: 'OnionIndexController'
    }).otherwise({
        redirectTo: '/'
    });
}]);