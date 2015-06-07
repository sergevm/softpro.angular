(function () {
    'use strict';

    function CompanyController($scope, $location, $confirm, DataRepository) {

        $scope.gridOptions = {};

        $scope.gridOptions.columnDefs = [
            {
                name: 'Name',
                field: 'Name'
            },
            {
                name: 'Vat',
                field: 'Vat'
            }
        ];

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
        };

        function loadCompanies() {
            DataRepository.getCompanies().then(function (data) {
                $scope.gridOptions.data = data;
            });
        }

        loadCompanies();

        $scope.delete = function (row) {

            $confirm({text: 'Are you sure you want to delete ' + row.entity.Name + '?'}).then(
                function () {
                    DataRepository.deleteCompany(row.entity).then(function () {
                        var index = $scope.gridOptions.data.indexOf(row.entity);
                        $scope.gridOptions.data.splice(index, 1);
                    });
                }
            );
        };

        $scope.detail = function (row) {
            $location.path('/company/' + row.entity.Id);
        };

        $scope.saveRow = function (rowEntity) {
            var promise;
            if (rowEntity.Id !== undefined) {
                promise = DataRepository.updateCompany(rowEntity);
                $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
            } else {
                promise = DataRepository.createCompany(rowEntity).then(loadCompanies);
                $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
            }
        };

        $scope.addRow = function () {
            $scope.gridOptions.data.unshift({});
        };
    }

    angular.module('app').controller('CompanyController', CompanyController);

    CompanyController.$inject = ['$scope', '$location', '$confirm', 'DataRepository'];
}());
