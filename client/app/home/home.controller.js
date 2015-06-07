(function () {
    'use strict';

    function HomeController($location) {
        var vm = this;
        vm.go = function (relativeUrl) {
            $location.path(relativeUrl);
        };
    }

    HomeController.$inject = ['$scope', '$location'];

    angular.module('app').controller('HomeController', HomeController);  
}());
