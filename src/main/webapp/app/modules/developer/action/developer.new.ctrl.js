(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperNewCtrl', DeveloperNewCtrl);

	function DeveloperNewCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = null;
		sc.country = null;
		sc.city = null;
		sc.adress = null;
		sc.director = null;
		sc.email = null;
		sc.phoneOfDirector = null;
		sc.phoneOrders = null;

		
		sc.save = function () {
			sc.hotel = {
				'name': sc.name,
				'country':sc.country,
				'city': sc.city,
				'adress': sc.adress,
				'director': sc.director,
				'email': sc.email,
				'phoneOfDirector': sc.phoneOfDirector,
				'phoneOrders': sc.phoneOrders
			}

			DeveloperService.new(sc.hotel)
			.success(function (data) {
				alert('added!');
				sc.hotel = null;
			});
		}
	};
})();
