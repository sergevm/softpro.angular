angular.module('app')
.directive('uiGridButtons', function() {
    return {
        'restrict': 'A',
        'link': function(scope, element) {
            scope.gridOptions.columnDefs.unshift(
                {
                    'displayName': null,
                    'name': 'actions', 
                    'enableCellEdit': false,
                    'enableColumnMenu': false,
                    'width': 160,
                    'cellTemplate': '<div class="btn-group"><button class="btn btn-primary" ng-click="grid.appScope.delete(row)">Delete</button><button class="btn btn-primary" ng-click="grid.appScope.detail(row)">Detail</button></div>'
                });
        }
    };
});