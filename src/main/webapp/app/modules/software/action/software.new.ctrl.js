(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareNewCtrl', SoftwareNewCtrl);

	function SoftwareNewCtrl ($scope, $state, $location, SoftwareService, DeveloperService, LicenseService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = null;
		sc.version = null;
		sc.release = new Date();
		sc.license = null;
		sc.windows = false;
		sc.linux = false;
		sc.macOS = false;
		
		sc.selDeveloper = {};
		sc.selLicense = {};

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

			if (sc.name != null 
				&& sc.version != null
				&& sc.selLicense != {}
				&& sc.selDeveloper != {}
				) {
				SoftwareService.new(sc.soft)
				.success(function (data) {
					alert('added!');
					sc.loadPage(1);
					sc.soft = null;
				});
			}
			else alert('Error');
		}
	}
})();
