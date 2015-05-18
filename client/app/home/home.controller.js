(function() {
	angular.module('app').controller('HomeController', HomeController);
	
	HomeController.$inject = ['$scope', '$location'];
	
	function HomeController($scope, $location){
		var vm = this;
		vm.go = function(relativeUrl) {
			$location.path(relativeUrl);
		};
	}	
})();
