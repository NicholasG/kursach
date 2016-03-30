(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersCtrl', WorkersCtrl);

	function WorkersCtrl($scope, $state, WorkersService) {
		var sc = $scope;

		sc.table = 'workers';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'fullName', 
		'position',
		'birthday',
		'age',
		'sex',
		'experience',
		'previousPosition',
		'date'
		];

		sc.openEdit = function (id) {
			$state.go('main.workers.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.workers.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.workers.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			WorkersService.getPage(currentPage, 10)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.searchByField = function(field, value) {
			if (value != '') {
				WorkersService.searchByField(field, value)
				.success(function (data){
					sc.main = data;
				});
			}
			else sc.loadPage(1); 
		};

		sc.loadPage(1); 
	};

})();
