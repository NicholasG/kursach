(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomNewCtrl', RoomNewCtrl);

	function RoomNewCtrl ($scope, $state, $location, RoomsService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.roomType = null;
		sc.numberOfRooms = null;
		sc.typeOfBed = null;
		sc.breakfast = null;
		sc.price = null;


		sc.save = function () {
			sc.room = {
				'room': sc.name,
				'roomType':sc.roomType,
				'numberOfRooms': sc.numberOfRooms,
				'typeOfBed': sc.typeOfBed,
				'breakfast': sc.breakfast,
				'price': sc.price
			}

			RoomsService.new(sc.room)
			.success(function (data) {
				alert('added!');
				sc.room = null;
			});
		}
	}
})();
