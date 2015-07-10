/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function () {
    'use strict';
    
    angular.module('app').service('DataRepository', ['$http', 'SERVICE_BASE_URL', function ($http, SERVICE_BASE_URL) {
        function urlFor(specificPart) {
            return SERVICE_BASE_URL + specificPart;
        }

        return {
            getCompanies: function () {
                return $http.get(urlFor('company')).then(
                    function(payload) { 
                        return payload.data; 
                    });
            },
            getCompany: function (id) {
                return $http.get(urlFor('company/' + id)).then(
                    function(payload) { 
                        return payload.data; 
                    });
            },
            updateCompany: function (company) {
                return $http.put(urlFor('company/' + company.Id), company);
            },
            createCompany: function (company) {
                return $http.post(urlFor('company'), company)
                    .then(function (payload) {
                        return payload.data;
                    });
            },
            deleteCompany: function (company) {
                return $http.delete(urlFor('company/' + company.Id));
            }
        };
    }]);
}());