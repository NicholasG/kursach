(function () {
	'use strict';

	var license = angular.module('license', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.license', {
			url: 'license',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'LicenseCtrl',
				}
			}
		})
		.state('main.license.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/license/action/license.action.view.html',
					controller: 'LicenseNewCtrl'
				}
			}
		})
		.state('main.license.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/license/action/license.action.view.html',
					controller: 'LicenseEditCtrl'
				}
			}
		})
		.state('main.license.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/license/action/license.action.delete.view.html',
					controller: 'LicenseDeleteCtrl'
				}
			}
		});

	}

})();
