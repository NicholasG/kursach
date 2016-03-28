(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomDeleteCtrl', RoomDeleteCtrl);

	function RoomDeleteCtrl ($scope, $state, $location, RoomsService) {
		var sc = $scope;

		sc.delete = function () {
			RoomsService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.room = null;
			});
		}
	};
})();
