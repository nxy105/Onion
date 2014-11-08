/* App Controllers */

var OnionControllers = angular.module('OnionControllers', []);

OnionControllers.controller('OnionIndexController', ['$scope', 'Potato', 'Onion', function($scope, Potato, Onion) {
    // list potatos
    Potato.listAll(function(potatos) {
        $scope.potatos = potatos;
    });

    // list onions
    Onion.listAll(function(onions) {
        $scope.onions = onions;
    });
}]);
