(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareNewCtrl', SoftwareNewCtrl);

	function SoftwareNewCtrl ($scope, $state, $location, SoftwareService, DeveloperService, LicenseService) {
		var sc = $scope;

		sc.action = 'add';

		sc.formValid = false;

		sc.name = '';
		sc.version = '';
		sc.release = new Date();
		sc.license = '';
		sc.windows = false;
		sc.linux = false;
		sc.macOS = false;
		sc.selDeveloper = '';
		sc.selLicense = '';

		sc.checkForm = function () {
            if (sc.name != '' 
				&& sc.version != ''
				&& sc.selLicense != ''
				&& sc.selDeveloper != ''
				&& sc.softForm.$valid
            ) sc.formValid = true;
            else sc.formValid = false;
        }

		DeveloperService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		LicenseService.getAll().success( function (data) {
			sc.licensies = data.content;
		});

		sc.save = function () {

			sc.soft = {
				'name': sc.name,
				'version': sc.version,
				'license': sc.selLicense,
				'developer': sc.selDeveloper,
				'release': sc.release.getFullYear() + '-' + sc.release.getMonth() + '-' + sc.release.getDate(),
				'windows': sc.windows,
				'linux': sc.linux,
				'macOS': sc.macOS
			}

			if (sc.formValid) SoftwareService.new(sc.soft)
			.success(function (data) {
				sc.loadPage(sc.currentPage);
				sc.soft = null;
				sc.closeThisDialog(true);
			});
		}
	}
})();
