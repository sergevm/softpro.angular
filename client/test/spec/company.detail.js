/* global inject */
'use strict';

(function() {
    describe('Company detail controller', function() {

        var $provide;

        beforeEach(function() {

            module('app');
            
            module(function(_$provide_) {
                $provide = _$provide_;
            });
        });

        describe('Resetting changes', function() {

            var repository, company = {};        

            beforeEach(inject(function($q, $routeParams) {
                
                repository =    
                    {
                        getCompany : function() {
                            var deferred = $q.defer();
                            deferred.resolve(company);
                            return deferred.promise;
                        }
                    };

                $provide.value('DataRepository', repository);
                $routeParams.id = 'companyId';
            }));

            it('Reloads the selected company', inject(function($controller, $rootScope) {

                spyOn(repository, 'getCompany').andCallThrough();

                var detailController = $controller('CompanyDetailController');
                detailController.reset();

                // promises are resolved/dispatched only on next $digest cycle
                $rootScope.$apply();

                expect(repository.getCompany).toHaveBeenCalledWith('companyId');
            }));

            it('Sets the company on the scope', inject(function($controller, $rootScope) {

                var detailController = $controller('CompanyDetailController');
                detailController.reset();

                // promises are resolved/dispatched only on next $digest cycle
                $rootScope.$apply();

                expect(detailController.company).toBe(company);                
            }));
        });

        describe('Saving changes', function() {
            
            var company = {};

            it('Updates the loaded company', inject(function($controller, DataRepository) {
                
                spyOn(DataRepository, 'updateCompany');

                var detailController = $controller('CompanyDetailController');
                detailController.company = company;
                detailController.save();

                expect(DataRepository.updateCompany).toHaveBeenCalledWith(company);
            }));
        });
    });
}());
