angular.module('app')
.directive('uiGridLayout', function(){
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.gridOptions.rowHeight = 35;
            scope.gridOptions.enableFiltering = true;
        }
    };
});