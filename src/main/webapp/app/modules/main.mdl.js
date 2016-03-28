(function () {
	'use strict';

	var main = angular.module('main', [
		'developer',
		'workers',
		'rooms',
		'ui.router',
		'ui.bootstrap',
		'ngResource',
		'pascalprecht.translate'
		])
	.config(configure).
	run(run);


	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
	function configure($stateProvider, $urlRouterProvider, $translateProvider) {

		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go('main.home');
		});

		$stateProvider
		.state('main', {
			url: '/',
			abstract: true,
			templateUrl: '/app/components/main/main.view.html',
			controller: 'SidebarCtrl'
		})
		.state('main.home', {
			url: 'home',
			views: {
				'': {
					templateUrl: '/app/components/home/home.view.html'
				}
			}
		});

		$translateProvider.useStaticFilesLoader({
            prefix: '/app/resources/lang/',
            suffix: '.json'
          });
	}

	function run($translate) {
		// $translate.use('en');
	}
})();