(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareCtrl', SoftwareCtrl);

	function SoftwareCtrl ($scope, $state, SoftwareService, DeveloperService) {
		var sc = $scope;
		
		sc.table = 'software';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'version',
		'release',
		'developer',
		'license',
		'windows',
		'linux',
		'macOS'
		];

		sc.openEdit = function (id) {
			$state.go('main.software.edit');
			sc.id = id;
		}

		sc.openAdd = function () {
			$state.go('main.software.new');
		}

		sc.openDelete = function (id) {
			$state.go('main.software.delete');
			sc.id = id;
		}

		sc.close = function () {
			$state.go('main.' + sc.table);
		}

		sc.loadPage = function(currentPage) {
			if (sc.name == '') sc.name = null;
			if (sc.country == '') sc.country = null;
			
			SoftwareService.getPage(currentPage - 1, 10, sc.name, sc.country)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();
