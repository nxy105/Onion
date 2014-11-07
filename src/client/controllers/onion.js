/* App Controllers */

var OnionControllers = angular.module('OnionControllers', []);

OnionControllers.controller('OnionIndexController', ['$scope', 'Potato', function($scope, Potato) {
    // use callback
    Potato.listAll(function(potatos) {
        console.log(potatos);
    });
}]);
