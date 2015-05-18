angular.module('app').controller('CompanyController', CompanyController);

CompanyController.$inject = ['DataRepository'];

function CompanyController(DataRepository) {
	var vm = this;
	loadCompanies();
	
	function loadCompanies() {
		DataRepository.getCompanies(function(data) { vm.companies = data; });
	}
}