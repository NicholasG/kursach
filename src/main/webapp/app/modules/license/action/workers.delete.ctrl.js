(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersDeleteCtrl', WorkersDeleteCtrl);

	function WorkersDeleteCtrl ($scope, $state, $location, WorkersService) {
		var sc = $scope;

		sc.delete = function () {
			WorkersService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.hotel = null;
			});
		}
	};
})();
