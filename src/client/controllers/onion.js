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
        var onionGroups = []
          , today = moment()
          , yesterday = moment().subtract(1, 'days')
          , createdOn, formattedDate, onion
          , currentGroupNum = -1;

        for (var i = 0; i < onions.length; i ++) {
            onion = onions[i];
            createdOn = moment(onion.createdOn);

            if (createdOn.isSame(today, 'day')) {
                formattedDate = '今天';
            } else if (createdOn.isSame(yesterday, 'day')) {
                formattedDate = '昨天';
            } else {
                formattedDate = createdOn.format('MM月DD日');
            }

            onion.createdOnTime = moment(onion.createdOn).format('HH:mm');
            onion.completedOnTime = moment(onion.completedOn).format('HH:mm');

            if (onionGroups[currentGroupNum] && onionGroups[currentGroupNum].date === formattedDate) {
                onionGroups[currentGroupNum].onions.push(onion);
            } else {
                currentGroupNum ++;
                onionGroups[currentGroupNum] = {
                    date: formattedDate,
                    onions: [onion]
                };
            }
        }

        $scope.onionGroups = onionGroups;
    });

    /**
     * init
     *
     * @return void
     */
    $scope.initOnion = function() {
        $scope.started = false;

        // show count clock
        $scope.showCountClock = true;
        $scope.showCountdownClock = false;
    };

    /**
     * start
     *
     * @return void
     */
    $scope.startOnion = function() {
        $scope.started = true;

        $scope.beginCount();
    };

    /**
     * endOnion
     *
     * @return void
     */
    $scope.endOnion = function() {
        $scope.initOnion();

        $scope.beginCountdown();
    };

    /**
     * completeOnion
     *
     * @return void
     */
    $scope.completeOnion = function() {
        $scope.initOnion();

        $scope.beginCountdown();
    };

    /**
     * begin count
     *
     * @return void
     */
    $scope.beginCount = function() {
        $scope.showCountClock = true;
        $scope.showCountdownClock = false;
        $scope.$broadcast('timer-start');
    };

    /**
     * begin count down
     *
     * @return void
     */
    $scope.beginCountdown = function() {
        $scope.showCountClock = false;
        $scope.showCountdownClock = true;
        $scope.$broadcast('timer-set-countdown-seconds', 300);
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