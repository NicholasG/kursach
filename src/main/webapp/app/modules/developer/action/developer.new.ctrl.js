(function() {
    'use strict';

    angular
    .module('main')
    .controller('DeveloperNewCtrl', DeveloperNewCtrl);

    function DeveloperNewCtrl($scope, $state, $location, $document, DeveloperService) {
        var sc = $scope;

        var fileLimitSuccess = false;

        sc.action = 'add';

        sc.formValid = false;

        sc.name = '';
        sc.country = '';
        sc.city = '';
        sc.street = '';
        sc.email = '';
        sc.zipcode = ''; 
        sc.website = '';
        sc.phoneNumber = '';
        sc.fax = '';

        sc.checkForm = function () {
            if (sc.name != '' 
                && sc.country != '' 
                && sc.city != '' 
                && sc.street != '' 
                && sc.email != '' 
                && sc.zipcode != '' 
                && sc.website != '' 
                && sc.phoneNumber != ''
                && sc.fax != ''
                && sc.devForm.$valid
            ) {
                sc.formValid = true;
            } 
            else {
                sc.formValid = false;
            }
        }

        sc.save = function() {
            sc.developer = {
                'name': sc.name,
                'country': sc.country,
                'city': sc.city,
                'street': sc.street,
                'email': sc.email,
                'zipcode': sc.zipcode,
                'website': sc.website,
                'phoneNumber': sc.phoneNumber,
                'fax': sc.fax
            };

            if (sc.formValid) DeveloperService.new(sc.developer)
				.success(function() {
				    sc.closeThisDialog(true);
				    sc.loadPage(1);
				});
        };

    };
})();
