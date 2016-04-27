(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperCtrl', DeveloperCtrl);

	function DeveloperCtrl ($scope, $state, $http, $stateParams, ngDialog, DeveloperService) {
		var sc = $scope;

		sc.table = 'developer';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[ 
		'name', 
		'country',
		'email',
		'website',
		'phoneNumber',
		'fax'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/developer/action/developer.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'DeveloperEditCtrl',
				scope: $scope
			});
			sc.id = id; 
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/developer/action/developer.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'DeveloperNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/developer/action/developer.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'DeveloperDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, country) {
			if (name == '') name = null;
			if (country == '') country = null;
			
			DeveloperService.getPage(currentPage - 1, 10, name, country)
			.success(function (data){
				sc.main = data;
			});

			sc.currentPage = currentPage;
		};

		sc.loadPage(1); 

		$http.get('app/shared/dropdown/countries/countries.json').success(function (data) {
			sc.countriesWithFlags = data;
		});		
	};
})();
