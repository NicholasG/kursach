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
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.developer.table', {
			url: '',
			views: {
				'content@main.developer': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'DeveloperCtrl'
				},
				'filter@main.developer.table': {
					templateUrl: '/app/modules/developer/filter/developer.filter.view.html'
				}

			}
		})
		.state('main.developer.profile', { 
			url: '/:id',
			views: {
				'content@main.developer': {
					templateUrl: '/app/modules/developer/profile/developer.profile.view.html',
					controller: 'DeveloperProfileCtrl'
				}
			}
		});
	}

})();
