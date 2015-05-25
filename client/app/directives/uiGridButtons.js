angular.module('app')
.directive('uiGridButtons', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.gridOptions.columnDefs.unshift(
                {
                    name: 'Action', 
                    cellTemplate: '<input type="button" class="btn btn-primary" value="Show"/>'
                });
        }
    };
});