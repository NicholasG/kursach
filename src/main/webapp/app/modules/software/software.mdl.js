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
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.software.table', {
			url: '',
			views: {
				'content@main.software': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'SoftwareCtrl',
				}
			}
		})
		.state('main.software.new', {
			url: '/new',
			views: {
				'action @main.software': {
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
		.state('main.software.profile', { 
			url: '/:id',
			views: {
				'content@main.software': {
					templateUrl: '/app/shared/profile/profile.view.html',
					controller: 'SoftwareProfileCtrl'
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
