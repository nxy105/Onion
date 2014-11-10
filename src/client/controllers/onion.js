/* App Controllers */

var OnionControllers = angular.module('OnionControllers', []);

OnionControllers.controller('OnionIndexController', ['$scope', 'Potato', 'Onion', function($scope, Potato, Onion) {
    window.MY_SCOPE = $scope;

    // list potatos
    Potato.listAll(function(potatos) {
        $scope.potatos = potatos;
    });

    // list onions
    Onion.listAll(function(onions) {
        var formattedOnions = {};
        for (var i = 0; i < onions.length; i ++) {
            var onion = onions[i]
              , today = moment()
              , yesterday = moment().subtract(1, 'days')
              , createdOn, formattedDate;

            createdOn = moment(onion.createdOn);
            if (createdOn.isSame(today, 'day')) {
                formattedDate = '今天';
            } else if (createdOn.isSame(yesterday, 'day')) {
                formattedDate = '昨天';
            } else {
                formattedDate = createdOn.format('MM月DD日');
            }

            if (formattedOnions[formattedDate] === undefined) {
                formattedOnions[formattedDate] = [];
            }

            onion.createdOnTime = moment(onion.createdOn).format('HH:mm');
            onion.completedOnTime = moment(onion.completedOn).format('HH:mm');
            formattedOnions[formattedDate].push(onion);
        }

        $scope.formattedOnions = formattedOnions;
        console.log(formattedOnions);
    });

    /**
     * init
     *
     * @return void
     */
    $scope.initOnion = function() {
        $scope.started = false;
    };

    /**
     * start
     *
     * @return void
     */
    $scope.startOnion = function() {
        $scope.started = true;
    };

    /**
     * endOnion
     *
     * @return void
     */
    $scope.endOnion = function() {
        $scope.initOnion();
    };

    /**
     * completeOnion
     *
     * @return void
     */
    $scope.completeOnion = function() {
        $scope.initOnion();
    };

    // init onion
    $scope.initOnion();

    /**
     * register pick on potato
     *
     * @param  object  potato   potato object
     * @return void
     */
    $scope.selectPotato = function(potato) {
        var potatos = $scope.potatos;
        for (var i = 0; i < potatos.length; i ++) {
            potatos[i].selected = false;
        }

        // selected this potato before
        if ($scope.selectedPotatoId === potato.potatoId) {
            $scope.selectedPotatoId = 0;
        } else {
            potato.selected = true;
            $scope.selectedPotatoId = potato.potatoId;
        }
    };

    /**
     * remove a potato
     *
     * @param  object potato potato object
     * @return void
     */
    $scope.removePotato = function($event, potato) {
        var potatoId = potato.potatoId;
        Potato.remove(potatoId, function() {
            $scope.potatos = $.grep($scope.potatos, function(potato) {
                return potato.potatoId !== potatoId;
            });

            if ($scope.selectedPotatoId === potatoId) {
                $scope.selectedPotatoId = 0;
            }
        });

        // stop event
        return $event.stopPropagation();
    };

    /**
     * create a potato
     *
     * @param  object potato potato object
     * @return void
     */
    $scope.createPotato = function(newPotato) {
        if (!newPotato || !newPotato.title) {
            return;
        }

        Potato.create(newPotato, function(potato) {
            $scope.potatos.unshift(potato);
        });

        // clean potato form
        $scope.newPotato = {};
    };
}]);