angular.module('app')
.directive('uiGridButtons', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.gridOptions.columnDefs.unshift(
                {
                    displayName: null,
                    name: 'actions', 
                    enableCellEdit: false,
                    enableColumnMenu: false,
                    width: 80,
                    cellTemplate: '<button class="btn btn-primary" ng-click="grid.appScope.delete(row)">Delete</button>'
                });
        }
    };
});