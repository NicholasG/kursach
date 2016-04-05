(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseCtrl', LicenseCtrl);

	function LicenseCtrl($scope, $state, LicenseService) {
		var sc = $scope;

		sc.table = 'license';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'name', 
		'type',
		'minimumUsers',
		'maximumUsers',
		'expiration',
		'priceForOne',
		'priceForTen',
		'priceForHundred'
		];

		sc.openEdit = function (id) {
			$state.go('main.license.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.license.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.license.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			LicenseService.getPage(currentPage - 1, 10)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();
