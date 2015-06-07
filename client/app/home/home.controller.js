(function () {
    'use strict';

    function HomeController($location) {
        var vm = this;
        vm.go = function (relativeUrl) {
            $location.path(relativeUrl);
        };
    }

    HomeController.$inject = ['$location'];

    angular.module('app').controller('HomeController', HomeController);  
}());
