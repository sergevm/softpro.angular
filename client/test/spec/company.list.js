/* globals inject */
(function() {
    'use strict';

    describe('Company controller', function() {
        
        var $provide,
            repository;

        beforeEach(function() {
            module('app');

            module(function(_$provide_) {
                $provide = _$provide_;
            });        
        });

        beforeEach(inject(function($q) {
            repository = {
                getCompanies: function() {
                    return $q.when([{}]);
                },
                deleteCompany: function() {
                    return $q.when({});
                },
                createCompany: function() {
                    return $q.when({});
                },
                updateCompany: function() {
                    return $q.when({});
                }
            };

            $provide.value('DataRepository', repository);  
            })
        );                    

        it('Fetches list of companies', inject(function($q, $controller, $rootScope) {
            spyOn(repository, 'getCompanies').andCallThrough();

            var scope = $rootScope.$new();

            $controller('CompanyController', {$scope: scope});       

            expect(repository.getCompanies).toHaveBeenCalled();
        }));

        it('Binds the retrieved companies to the grid', inject(function($q, $controller, $rootScope) {
            spyOn(repository, 'getCompanies').andCallThrough();

            var scope = $rootScope.$new();
            $controller('CompanyController', {$scope: scope});       

            // promises are resolved/dispatched only on next $digest cycle
            $rootScope.$apply();

            expect(scope.gridOptions.data.length).toBe(1);                 
        }));

        it('Displays Name and Vat columns', inject(function($controller, $rootScope) {
            var scope = $rootScope.$new();
            $controller('CompanyController', {$scope: scope});       
           
            expect(scope.gridOptions).not.toBe(undefined);
            expect(scope.gridOptions.columnDefs.length).toBe(2);
            expect(scope.gridOptions.columnDefs[0].name).toBe('Name');
            expect(scope.gridOptions.columnDefs[1].name).toBe('Vat');
        }));

        describe('Show detail', function() {
            it('Navigates to detail route', inject(function($controller, $location, $rootScope) {
                var scope = $rootScope.$new(),
                    row = { entity : {Id: 'id'}};

                $controller('CompanyController', {$scope: scope});       

                scope.detail(row);  

                expect($location.url()).toBe('/company/id');          
            }));
        });

        describe('Delete company', function() {

            var confirmationCalled = false;

            function interceptConfirmation() {
                return {
                    then: function(callback) {
                        confirmationCalled = true;
                        callback();
                    }
                };
            }

            beforeEach(function() {
                $provide.value('$confirm', interceptConfirmation);
            });

            it('Asks for confirmation', inject(function($controller, $rootScope) {
                var scope = $rootScope.$new(),
                    row = { entity : {Id: 'id'}};

                $controller('CompanyController', {$scope: scope});   

                scope.delete(row);   

                expect(confirmationCalled).toBe(true);             
            }));

            it('Deletes the company after confirmation', inject(function($controller, $rootScope, DataRepository) {
                var scope = $rootScope.$new(),
                    row = { entity : {Id: 'id'}};

                $controller('CompanyController', {$scope: scope});   

                spyOn(DataRepository, 'deleteCompany').andCallThrough();

                scope.delete(row);

                expect(DataRepository.deleteCompany).toHaveBeenCalled();
            }));
        }); 

        describe('Save company', function() {

            var gridApi = {
                rowEdit: {
                    on: {
                        saveRow: function(){}
                    },
                    setSavePromise: function(){}
                }
            };

            it('Creates a new company', inject(function($controller, $rootScope, DataRepository) {
                
                var scope = $rootScope.$new(),
                    row = { entity : {}};

                spyOn(DataRepository, 'createCompany').andCallThrough();

                $controller('CompanyController', {$scope: scope});

                scope.gridOptions.onRegisterApi(gridApi);
                scope.saveRow(row);

                expect(DataRepository.createCompany).toHaveBeenCalled();
            }));

            it('Updates an existing company', inject(function($rootScope, $controller, DataRepository) {
               var scope = $rootScope.$new(),
                    entity = { Id: 'id' };

                spyOn(DataRepository, 'updateCompany');

                $controller('CompanyController', {$scope: scope});
                scope.gridOptions.onRegisterApi(gridApi);

                scope.saveRow(entity);

                expect(DataRepository.updateCompany).toHaveBeenCalled();    
            }));

            it('Reloads the list after creating new company', inject(function($rootScope, $controller, DataRepository) {

               var scope = $rootScope.$new(),
                    entity = { Id: undefined };

                $controller('CompanyController', {$scope: scope});
                scope.gridOptions.onRegisterApi(gridApi);

                spyOn(DataRepository, 'getCompanies').andCallThrough();

                scope.saveRow(entity);

                $rootScope.$apply();

                expect(DataRepository.getCompanies).toHaveBeenCalled();
            }));
        }); 
    });
})();