(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareEditCtrl', SoftwareEditCtrl);

	function SoftwareEditCtrl ($scope, $state, $location, SoftwareService, DeveloperService) {
		var sc = $scope;

		sc.action = 'Edit';

		SoftwareService.get(sc.id)
		.success(function (data) {
			sc.software = data;

			sc.id = sc.software.id;
			sc.name = sc.software.name;
			sc.version = sc.software.version;
			sc.releaseValue = sc.software.release;
			sc.license = sc.software.license;
			sc.developer = sc.software.developer;
			sc.windows = sc.software.windows;
			sc.linux = sc.software.linux;
			sc.macOS = sc.software.macOS;

			sc.release = new Date(sc.software.release);

			sc.selDeveloper = { id: sc.id };

			DeveloperService.getAll().success( function (data) {
				sc.developers = data.content;
			});

			sc.save = function () {
				sc.soft = {
					'id': sc.id,
					'name': sc.name,
					'version': sc.version,
					'release': sc.release.getFullYear() + '-' + (sc.release.getMonth() + 1) + '-' + sc.release.getDate(),
					'license': sc.license,
					'developer': sc.developers[sc.selDeveloper.id - 1],
					'windows': sc.windows,
					'linux': sc.linux,
					'macOS': sc.macOS
				}

				SoftwareService.update(sc.soft)
				.success(function (data) {
					alert('updated!');
					sc.soft = null;
				});
			}
		});
	}
})();
