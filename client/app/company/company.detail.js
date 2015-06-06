/* global angular */

function CompanyDetailController($routeParams, DataRepository) {
    'use strict';

    var vm = this,
        id = $routeParams.id;

    function loadCompany(id) {
        DataRepository.getCompany(id).then(function (data) {
            vm.company = data;
        });
    }

    function reset() {
        loadCompany(id);
    }

    function save() {
        DataRepository.updateCompany(vm.company);
    }

    vm.reset = reset;
    vm.save = save;

    loadCompany(id);
}

CompanyDetailController.$inject = ['$routeParams', 'DataRepository'];

angular.module('app').controller('CompanyDetailController', CompanyDetailController);