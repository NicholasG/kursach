(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseCtrl', LicenseCtrl);

	function LicenseCtrl($scope, $state, LicenseService, ngDialog) {
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
		'priceForOne'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/license/action/license.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'LicenseEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/license/action/license.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'LicenseNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id;
			ngDialog.open({ 
				template: '/app/modules/license/action/license.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'LicenseDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, type) {
			LicenseService.getPage(currentPage - 1, 10, name, type)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();
