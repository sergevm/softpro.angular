(function () {
    'use strict';

    angular.module('app')
        .directive('uiGridLayout', function () {
            return {
                restrict: 'A',
                link: function (scope) {
                    scope.gridOptions.rowHeight = 35;
                    scope.gridOptions.enableFiltering = true;
                }
            };
        });
}());