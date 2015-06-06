function ConfirmationController($modalInstance) {

    "use strict";

    var vm = this;

    vm.ok = function () {
        $modalInstance.close();
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

ConfirmationController.$inject = ['$modalInstance'];

angular.module('app').controller('ConfirmationController', ConfirmationController);