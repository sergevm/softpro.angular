/* global angular */

angular.module('app').controller('CompanyController', CompanyController);

CompanyController.$inject = ['$scope', '$location', 'DataRepository'];

function CompanyController($scope, $location, DataRepository) {
	
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

	$scope.gridOptions.onRegisterApi = function(gridApi){
	    $scope.gridApi = gridApi;
	    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
  	};

	loadCompanies();
	
	function loadCompanies() {
		DataRepository.getCompanies().then(function(data) {
			$scope.gridOptions.data = data;
		});
	}

	$scope.delete = function(row) {
		DataRepository.deleteCompany(row.entity).then(function() {
           var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);			
		});
	};

	$scope.detail = function(row){
		$location.path('/company/' + row.entity.Id);
	};
	
	 $scope.saveRow = function(rowEntity) {
		 if (rowEntity.Id !== undefined) {
		    var promise = DataRepository.updateCompany(rowEntity);		
		    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise );			 
		 }
		 else {
		    var promise = DataRepository.createCompany(rowEntity).then(loadCompanies);		
		    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise );			 
		 }
	  }; 	
	  
	 $scope.addRow = function() {
		$scope.gridOptions.data.unshift({}); 
	 };
}