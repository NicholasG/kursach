(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperEditCtrl', DeveloperEditCtrl);

	function DeveloperEditCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;
		sc.action = 'Edit';

		DeveloperService.get(sc.id)
		.success(function (data) {
			sc.hotel = data;
			sc.name = sc.hotel.name;
			sc.country = sc.hotel.country;
			sc.city = sc.hotel.city;
			sc.adress = sc.hotel.adress;
			sc.director = sc.hotel.director;
			sc.email = sc.hotel.email;
			sc.phoneOfDirector = sc.hotel.phoneOfDirector;
			sc.phoneOrders = sc.hotel.phoneOrders;

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

				DeveloperService.update(sc.id, sc.hotel)
				.success(function (data) {
					alert('updated!');
					sc.hotel = null;
				});
			}
		});
	}
})();
