(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperDeleteCtrl', DeveloperDeleteCtrl);

	function DeveloperDeleteCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;

		sc.delete = function () {
			DeveloperService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.hotel = null;
			});
		}
	};
})();
