(function() {
    'use strict';

    angular
    .module('main')
    .controller('DeveloperNewCtrl', DeveloperNewCtrl);

    function DeveloperNewCtrl($scope, $state, $location, $document, DeveloperService) {
        var sc = $scope;

        var fileLimit = 2000000;
        var fileLimitSuccess = false;

        sc.action = 'Add';

        sc.name = '';
        sc.country = '';
        sc.city = '';
        sc.street = '';
        sc.email = '';
        sc.zipcode = '';
        sc.website = '';
        sc.phoneNumber = '';
        sc.fax = '';

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

            if (sc.name != '' 
            	&& sc.country != '' 
            	&& sc.city != '' 
            	&& sc.street != '' 
            	&& sc.email != '' 
            	&& sc.zipcode != '' 
            	&& sc.website != '' 
            	&& sc.phoneNumber != ''
            	&& sc.fax != ''
            ) {
                DeveloperService.new(sc.developer)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(1);
					});
            } else alert('Error');
        };

    };
})();
