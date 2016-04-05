(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseNewCtrl', LicenseNewCtrl);

	function LicenseNewCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = null;
		sc.type = null;
		sc.minimumUsers = null;
		sc.maximumUsers = null;
		sc.expiration = null;
		sc.priceForOne = null;
		sc.priceForTen = null;
		sc.priceForHundred = null;
		
		sc.save = function () {
			sc.license = {
				'name': sc.name,
				'type': sc.type,
				'minimumUsers':sc.minimumUsers,
				'maximumUsers': sc.maximumUsers,
				'expiration': sc.expiration,
				'priceForOne': sc.priceForOne,
				'priceForTen': sc.priceForTen,
				'priceForHundred': sc.priceForHundred
			}

			LicenseService.new(sc.license)
			.success(function (data) {
				alert('added!');
				sc.license = null;
				sc.loadPage(1);
			});
		}
	};
})();
