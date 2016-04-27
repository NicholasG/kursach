(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseEditCtrl', LicenseEditCtrl);

	function LicenseEditCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;
		sc.action = 'edit';

		sc.formValid = false;

		LicenseService.get(sc.id)
		.success(function (data) {
			sc.license = data;

			sc.id = sc.license.id;
			sc.name = sc.license.name;
			sc.type = sc.license.type;
			sc.minimumUsers = sc.license.minimumUsers;
			sc.maximumUsers = sc.license.maximumUsers;
			sc.expiration = sc.license.expiration;
			sc.priceForOne = sc.license.priceForOne;
			sc.priceForTen = sc.license.priceForTen;
			sc.priceForHundred = sc.license.priceForHundred;

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
					'id': sc.id,
					'name': sc.name,
					'type': sc.type,
					'minimumUsers':sc.minimumUsers,
					'maximumUsers': sc.maximumUsers,
					'expiration': sc.expiration,
					'priceForOne': sc.priceForOne,
					'priceForTen': sc.priceForTen,
					'priceForHundred': sc.priceForHundred
				}

				if (sc.formValid) LicenseService.update(sc.license)
					.success(function (data) {
						sc.license = null;
						sc.closeThisDialog(true);
						sc.loadPage(sc.currentPage);
					});
			}
		});
	}
})();
