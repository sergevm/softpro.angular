angular.module('app').controller('CompanyController', CompanyController);

CompanyController.$inject = ['$scope', 'DataRepository'];

function CompanyController($scope, DataRepository) {
	$scope.gridOptions = {};
	
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
	
	 $scope.saveRow = function( rowEntity ) {
	    var promise = DataRepository.updateCompany(rowEntity);		
	    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise );
	  }; 	
}