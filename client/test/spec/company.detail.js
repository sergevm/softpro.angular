'use strict';

(function() {
    describe("Company detail", function() {

        var $rootScope,
            $controller,
            $provide, 
            $q,
            $routeParams;

        beforeEach(function() {

            module('app');
            
            module(function(_$provide_) {
                $provide = _$provide_;
            });
        });

        beforeEach(inject(function(_$rootScope_, _$q_, _$controller_, _$routeParams_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $routeParams = _$routeParams_;
        }));

        describe("Resetting changes", function() {

            var repository =    
                {
                    getCompany : function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(company);
                        return deferred.promise;
                    }
                },
                company = {};        

            beforeEach(function() {
                $provide.value('DataRepository', repository);
                $routeParams.id = 'companyId';
            });

            it('Reloads the selected company', function() {

                spyOn(repository, 'getCompany').andCallThrough();

                var detailController = $controller('CompanyDetailController');
                detailController.reset();

                // promises are resolved/dispatched only on next $digest cycle
                $rootScope.$apply();

                expect(repository.getCompany).toHaveBeenCalledWith('companyId');
            });

            it("Sets the company on the scope", function() {

                var detailController = $controller('CompanyDetailController');
                detailController.reset();

                // promises are resolved/dispatched only on next $digest cycle
                $rootScope.$apply();

                expect(detailController.company).toBe(company);                
            });
        });

        describe('Saving changes', function() {
            
            var nullPromise = function() { return { then: function() {}}},
                repository =    {
                                    'getCompany': nullPromise,
                                    'updateCompany': nullPromise
                                },
                company = {};

            beforeEach(function() {
                $provide.value('DataRepository', repository);
            });

            it("Updates the loaded company", function() {
                
                spyOn(repository, 'updateCompany');

                var detailController = $controller('CompanyDetailController');
                detailController.company = company;
                detailController.save();

                expect(repository.updateCompany).toHaveBeenCalledWith(company);
            });
        });
    });
}());
