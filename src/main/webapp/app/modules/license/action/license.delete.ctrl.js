(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseDeleteCtrl', LicenseDeleteCtrl);

	function LicenseDeleteCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;

		sc.delete = function () {
			LicenseService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.loadPage(1);
			});
		}
	};
})();
