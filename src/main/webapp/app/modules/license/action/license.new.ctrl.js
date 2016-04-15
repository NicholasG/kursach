(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseNewCtrl', LicenseNewCtrl);

	function LicenseNewCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = '';
		sc.type = '';
		sc.minimumUsers = '';
		sc.maximumUsers = '';
		sc.expiration = '';
		sc.priceForOne = '';
		sc.priceForTen = '';
		sc.priceForHundred = '';
		
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

			if (sc.name != '' 
				&& sc.type != ''
				&& sc.minimumUsers != ''
				&& sc.maximumUsers != ''
				&& sc.expiration != ''
				&& sc.priceForOne != ''
				&& sc.priceForTen != ''
				&& sc.priceForHundred != ''
				) {
				LicenseService.new(sc.license)
				.success(function (data) {
					sc.license = null;
					sc.closeThisDialog(true);
					sc.loadPage(1);
				});
			}
			else alert('Error');
		}
	};
})();
