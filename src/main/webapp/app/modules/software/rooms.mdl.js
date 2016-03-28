(function () {
	'use strict';

	var rooms = angular.module('rooms', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.rooms', {
			url: 'rooms',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'RoomsCtrl',
				}
			}
		})
		.state('main.rooms.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/rooms/action/rooms.action.view.html',
					controller: 'RoomNewCtrl'
				}
			}
		})
		.state('main.rooms.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/rooms/action/rooms.action.view.html',
					controller: 'RoomEditCtrl'
				}
			}
		})
		.state('main.rooms.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/rooms/action/rooms.action.delete.view.html',
					controller: 'RoomDeleteCtrl'
				}
			}
		});

	}

})();
