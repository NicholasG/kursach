(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperCtrl', DeveloperCtrl);

	function DeveloperCtrl ($scope, $state, $http, $translate, DeveloperService) {
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
			$state.go('main.developer.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.developer.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.developer.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage, name) {
			DeveloperService.getPage(currentPage - 1, 10, name)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 

		$http.get('app/shared/dropdown/countries/countries.json').success(function (data) {
			sc.countriesWithFlags = data;
		});

		// sc.keys = Object.keys(sc.country);
		
	};
})();
