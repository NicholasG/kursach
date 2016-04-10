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
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.license.table', {
			url: '', 
			views: {
				'content@main.license': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'LicenseCtrl',
				},
				'filter@main.license.table': {
					templateUrl: '/app/modules/license/filter/license.filter.view.html'
				}
			}
		});

	}

})();
