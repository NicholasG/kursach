(function () {
	'use strict';

	var developer = angular.module('developer', [
		'ui.router'
		])
	.config(configure);
 

	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.developer', {
			url: 'developer',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'DeveloperCtrl'
				}
			}
		})
		.state('main.developer.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/developer/action/developer.action.view.html',
					controller: 'DeveloperNewCtrl'
				}
			}
		})
		.state('main.developer.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/developer/action/developer.action.view.html',
					controller: 'DeveloperEditCtrl'
				}
			}
		})
		.state('main.developer.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/developer/action/developer.action.delete.view.html',
					controller: 'DeveloperDeleteCtrl'
				}
			}
		});

	}

})();
