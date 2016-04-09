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
				},
				'filter@main.software.table': {
					templateUrl: '/app/modules/software/filter/software.filter.view.html'
				}
			}
		})
		.state('main.software.profile', { 
			url: '/:id',
			views: {
				'content@main.software': {
					templateUrl: '/app/modules/software/profile/software.profile.view.html',
					controller: 'SoftwareProfileCtrl'
				}
			}
		});
	}

})();
