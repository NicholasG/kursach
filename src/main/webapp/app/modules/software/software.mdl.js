(function () {
	'use strict';

	var software = angular.module('software', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.software', {
			url: 'software',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'SoftwareCtrl',
				}
			}
		})
		.state('main.software.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/software/action/software.action.view.html',
					controller: 'SoftwareNewCtrl'
				}
			}
		})
		.state('main.software.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/software/action/software.action.view.html',
					controller: 'SoftwareEditCtrl'
				}
			}
		})
		.state('main.software.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/software/action/software.action.delete.view.html',
					controller: 'SoftwareDeleteCtrl'
				}
			}
		});

	}

})();
