(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomsCtrl', RoomsCtrl);

	function RoomsCtrl($scope, $state, RoomsService) {
		var sc = $scope;
		
		sc.table = 'rooms';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'roomOfType', 
		'numberOfRooms',
		'typeOfBed',
		'breakfast',
		'price'
		];

		sc.openEdit = function (id) {
			$state.go('main.rooms.edit');
			sc.id = id;
		}

		sc.openAdd = function () {
			$state.go('main.rooms.new');
		}

		sc.openDelete = function (id) {
			$state.go('main.rooms.delete');
			sc.id = id;
		}

		sc.close = function () {
			$state.go('main.' + sc.table);
		}

		sc.loadPage = function(currentPage) {
			RoomsService.getPage(currentPage, 10)
			.success(function(data){
				sc.main = data;
			});
		};

		sc.searchByField = function(field, value) {
			if (value != '') {
				RoomsService.searchByField(field, value)
				.success(function(data){
					sc.main = data;
				});
			}
			else sc.loadPage(1); 
		};

		sc.loadPage(1); 
	};

})();
