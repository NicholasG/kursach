(function () {
	'use strict';

	var workers = angular.module('workers', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.workers', {
			url: 'workers',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'WorkersCtrl',
				}
			}
		})
		.state('main.workers.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/workers/action/workers.action.view.html',
					controller: 'WorkersNewCtrl'
				}
			}
		})
		.state('main.workers.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/workers/action/workers.action.view.html',
					controller: 'WorkersEditCtrl'
				}
			}
		})
		.state('main.workers.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/workers/action/workers.action.delete.view.html',
					controller: 'WorkersDeleteCtrl'
				}
			}
		});

	}

})();
