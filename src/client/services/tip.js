/* Tip Services */

var TipServices = angular.module('TipServices', []);

// factory potato service
TipServices.factory('Tip', [function() {
    var defaultTips, tipMap;

    defaultTips = [];
    tipMap = {
        default: '选择一个土豆, 开始一段洋葱之旅',
        addPotato: '快去我的右侧, 添加一个土豆吧',
        haveARest: '完成了一个土豆, 休息一会, 喝个咖啡换个心情',
        startAOnion: '开始了新的洋葱, 争取尽快完成它吧'
    };

    return {
        /**
         * set
         *
         * @param object $scope
         * @param string name    tip name
         */
        set: function($scope, name) {
            if (tipMap[name]) {
                $scope.tip = tipMap[name];
            }
        }
    };
}]);