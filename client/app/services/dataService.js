/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function () {
    'use strict';
    
    angular.module('app').service('DataRepository', ['$q', '$http', 'SERVICE_BASE_URL', function ($q, $http, SERVICE_BASE_URL) {
        function urlFor(specificPart) {
            return SERVICE_BASE_URL + specificPart;
        }

        return {
            getCompanies: function () {
                var deferred = $q.defer();
                $http.get(urlFor('company'))
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(deferred.reject);

                return deferred.promise;
            },
            getCompany: function (id) {
                var deferred = $q.defer();
                $http.get(urlFor('company/' + id))
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(deferred.reject);

                return deferred.promise;
            },
            updateCompany: function (company) {
                var deferred = $q.defer();
                $http.put(urlFor('company/' + company.Id), company)
                    .success(deferred.resolve)
                    .error(deferred.reject);

                return deferred.promise;
            },
            createCompany: function (company) {
                var deferred = $q.defer();
                $http.post(urlFor('company'), company)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(deferred.reject);

                return deferred.promise;
            },
            deleteCompany: function (company) {
                var deferred = $q.defer();
                $http.delete(urlFor('company/' + company.Id))
                    .success(deferred.resolve)
                    .error(deferred.reject);

                return deferred.promise;
            }
        };
    }]);
}());