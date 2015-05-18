/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeController',
		controllerAs: 'vm'
	});
	
	$routeProvider.when('/company', {
		templateUrl: 'company/list.html',
		controller: 'CompanyController',
		controllerAs: 'vm'
	});
	
	$routeProvider.otherwise({redirectTo: '/home'});
}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])