(function() {
	angular.module('app').service('DataRepository', ['$http', function($http) {
		return {
			getCompanies: function(callback) {
				$http.get('http://localhost:5001/api/company')
				.success(function(data, status, headers, config){
					callback(data);
				})
				.error(function(data, status, headers, config) {
					// TODO
				});
			}	
		};
	}]);
})();