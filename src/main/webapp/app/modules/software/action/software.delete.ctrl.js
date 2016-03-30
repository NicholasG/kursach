(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareDeleteCtrl', SoftwareDeleteCtrl);

	function SoftwareDeleteCtrl ($scope, $state, $location, SoftwareService) {
		var sc = $scope;

		sc.delete = function () {
			SoftwareService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.loadPage(1);
			});
		}
	};
})();
