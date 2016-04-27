(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseNewCtrl', LicenseNewCtrl);

	function LicenseNewCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;

		sc.action = 'add';

		sc.formValid = false;

		sc.name = '';
		sc.type = '';
		sc.minimumUsers = null;
		sc.maximumUsers = null;
		sc.expiration = null;
		sc.priceForOne = '';
		sc.priceForTen = '';
		sc.priceForHundred = '';

		sc.checkForm = function () {
            if (sc.name != '' 
				&& sc.type != ''
				&& sc.minimumUsers != 0
				&& sc.maximumUsers != 0
				&& sc.expiration != 0
				&& sc.minimumUsers != null
				&& sc.maximumUsers != null
				&& sc.expiration != null
				&& sc.licenseForm.$valid
            ) {
                sc.formValid = true;
            } 
            else {
                sc.formValid = false;
            }
        }
		
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

			if (sc.formValid) LicenseService.new(sc.license)
			.success(function (data) {
				sc.license = null;
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			});
		}
	};
})();
