/// <reference path="../../typings/angularjs/angular.d.ts"/>
"use strict";

var app = angular.module('app', ['ngRoute', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.rowEdit']);

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
}]);

app.constant('SERVICE_BASE_URL', 'http://localhost:5001/api/');

app.config(function($provide){
  $provide.decorator('GridOptions',function($delegate){
    var gridOptions;
    gridOptions = angular.copy($delegate);
    gridOptions.initialize = function(options) {
      var initOptions;
      initOptions = $delegate.initialize(options);
      initOptions.enableColumnMenus = true;
      initOptions.rowHeight = 40;
      return initOptions;
    };
    return gridOptions;
  });
});