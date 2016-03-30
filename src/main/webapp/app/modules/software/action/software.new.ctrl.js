(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareNewCtrl', SoftwareNewCtrl);

	function SoftwareNewCtrl ($scope, $state, $location, SoftwareService, DeveloperService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = null;
		sc.version = null;
		sc.release = null;
		sc.license = null;
		sc.windows = false;
		sc.linux = false;
		sc.macOS = false;
		
		sc.selDeveloper = { id: null };

		DeveloperService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		sc.save = function () {

			sc.soft = {
				'name': sc.name,
				'version': sc.version,
				'license': {"id":1,"name":"license1","type":"FREE","minimumUsers":1,"maximumUsers":100,"expiration":256,"priceForOne":0.0,"priceForTen":0.0,"priceForHundred":0.0},
				'developer': sc.developers[sc.selDeveloper.id - 1],
				'release': sc.release.getFullYear() + '-' + sc.release.getMonth() + '-' + sc.release.getDate(),
				'windows': sc.windows,
				'linux': sc.linux,
				'macOS': sc.macOS
			}

			SoftwareService.new(sc.soft)
			.success(function (data) {
				alert('added!');
				sc.soft = null;
			});
		}
	}
})();
