(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperNewCtrl', DeveloperNewCtrl);

	function DeveloperNewCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.id = null;
		sc.name = null;
		sc.country = null;
		sc.city = null;
		sc.street = null;
		sc.email = null;
		sc.zipcode = null;
		sc.website = null;
		sc.phoneNumber = null;
		sc.fax = null;

		
		sc.save = function () {
			sc.developer = {
					'id': sc.id,
					'name': sc.name,
					'country': sc.country.name,
					'city': sc.city,
					'street': sc.street,
					'email': sc.email,
					'zipcode': sc.zipcode,
					'website': sc.website,
					'phoneNumber': sc.phoneNumber,
					'fax': sc.fax
				}

			DeveloperService.new(sc.developer)
			.success(function (data) {
				alert('added!');
				sc.developer = null;
			});
		}
	};
})();
