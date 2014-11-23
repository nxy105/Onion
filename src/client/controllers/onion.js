/* App Controllers */

var OnionControllers = angular.module('OnionControllers', []);

OnionControllers.controller('OnionIndexController', ['$scope', 'Potato', 'Onion', 'Tip', function($scope, Potato, Onion, Tip) {

    $scope.user = onion.user;

    /**
     * init
     *
     * @return void
     */
    $scope.initOnionClock = function() {
        $scope.started = false;
    };

    /**
     * start
     *
     * @return void
     */
    $scope.startOnion = function() {
        $scope.started = true;
        $scope.beginCount();
        $scope.onionStartOn = new Date();

        Tip.set($scope, 'startAOnion');
    };

    /**
     * endOnion
     *
     * @return void
     */
    $scope.endOnion = function() {
        // create a onion
        Onion.create($scope.getNewOnion(), function(onion) {
            createOnionForOnionGroup(onion);
        });

        $scope.initOnionClock();
        $scope.beginCountdown();

        Tip.set($scope, 'haveARest');
    };

    /**
     * completeOnion
     *
     * @return void
     */
    $scope.completeOnion = function() {
        // create a onion
        Onion.create($scope.getNewOnion(), function(onion) {
            createOnionForOnionGroup(onion);
        });

        Potato.update($scope.selectedPotatoId, {status: 'complete'}, function(potato) {
            removePotato(potato);
        });

        $scope.initOnionClock();
        $scope.beginCountdown();

        Tip.set($scope, 'haveARest');
    };

    /**
     * getNewOnion
     *
     * @return object
     */
    $scope.getNewOnion = function() {
        return {
            createdOn: moment($scope.onionStartOn).format('YYYY-MM-DD HH:mm:ss'),
            completedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
            potatoId: $scope.selectedPotatoId
        };
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
        Potato.remove(potato.potatoId, function() {
            removePotato(potato);
        });

        // stop event
        return $event.stopPropagation();
    };

    /**
     * removePotato
     *
     * @param  object potato  potato object
     * @return void
     */
    var removePotato = function(potato) {
        $scope.potatos = $.grep($scope.potatos, function(item) {
            return potato.potatoId !== item.potatoId;
        });

        if ($scope.selectedPotatoId === potato.potatoId) {
            $scope.selectedPotatoId = 0;
        }
    };

    /**
     * initOnionList
     *
     * @param  array onions onion list
     * @return void
     */
    var initOnionList = function(onions) {
        var onionGroups = []
          , currentGroupNum = -1
          , date, onion;

        for (var i = 0; i < onions.length; i ++) {
            onion = onions[i];
            onion.createdOnTime = moment(onion.createdOn).format('HH:mm');
            onion.completedOnTime = moment(onion.completedOn).format('HH:mm');

            date = moment(onion.createdOn).format('YYYY-MM-DD');

            if (onionGroups[currentGroupNum] && onionGroups[currentGroupNum].date === date) {
                onionGroups[currentGroupNum].onions.push(onion);
            } else {
                currentGroupNum ++;
                onionGroups[currentGroupNum] = {
                    date: date,
                    onions: [onion]
                };
            }
        }

        $scope.onionGroups = onionGroups;
    };

    /**
     * createOnionForOnionGroup
     *
     * @param  object onion  onion object
     * @return void
     */
    var createOnionForOnionGroup = function(onion) {
        var onionGroups = $scope.onionGroups
          , createdOn = moment(onion.createdOn).format('YYYY-MM-DD');

        onion.createdOnTime = moment(onion.createdOn).format('HH:mm');
        onion.completedOnTime = moment(onion.completedOn).format('HH:mm');

        if (onionGroups[0] && onionGroups[0].date === createdOn) {
            onionGroups[0].onions.unshift(onion);
        } else {
            onionGroups[0] = {
                date: createdOn,
                onions: [onion]
            }
        }
    };

    /**
     * formatDate
     *
     * @param  string date  date string
     * @return string
     */
    $scope.formatDate = function(date) {
        var today = moment().format('YYYY-MM-DD')
          , yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

        if (date === today) {
            return '今天';
        } else if (date === yesterday) {
            return '昨天';
        } else {
            return moment(date).format('MM月DD日');
        }
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

    $scope.initOnionClock();

    // list potatos
    Potato.listAll(function(potatos) {
        $scope.potatos = potatos;

        if (!potatos || potatos.length === 0) {
            Tip.set($scope, 'addPotato');
        }
    });

    // list onions
    Onion.listAll(function(onions) {
         initOnionList(onions);
    });

    Tip.set($scope, 'default');

    window.MY_SCOPE = $scope;
}]);