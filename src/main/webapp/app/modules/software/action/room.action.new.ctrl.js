(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomNewCtrl', RoomNewCtrl);

	function RoomNewCtrl ($scope, $state, $location, RoomsService) {
		var sc = $scope;
		sc.action = 'Edit';

		RoomsService.get(sc.id)
		.success(function (data) {
			sc.room = data;
			sc.roomType = sc.room.roomType;
			sc.numberOfRooms = sc.room.numberOfRooms;
			sc.typeOfBed = sc.room.typeOfBed;
			sc.breakfast = sc.room.breakfast;
			sc.price = sc.room.price;

			sc.save = function () {
				sc.room = {
					'room': sc.name,
					'roomType':sc.roomType,
					'numberOfRooms': sc.numberOfRooms,
					'typeOfBed': sc.typeOfBed,
					'breakfast': sc.breakfast,
					'price': sc.price
				}

				RoomsService.update(sc.id, sc.room)
				.success(function (data) {
					alert('updated!');
					sc.room = null;
				});
			}
		});
	}
})();
