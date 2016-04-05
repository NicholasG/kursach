(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperCtrl', DeveloperCtrl);

	function DeveloperCtrl ($scope, $state, $http, $base64, $translate, ngDialog, DeveloperService) {
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

		sc.filterViewUrl = 'app/modules/' + sc.table + '/filter/' + sc.table + '.filter.view.html';

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
				controller: 'DeveloperNewCtrl'
			});
		};

		sc.openDelete = function (id) {
			$state.go('main.developer.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			if (sc.name == '') sc.name = null;
			if (sc.country == '') sc.country = null;
			
			DeveloperService.getPage(currentPage - 1, 10, sc.name, sc.country)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 

		$http.get('app/shared/dropdown/countries/countries.json').success(function (data) {
			sc.countriesWithFlags = data;
		});

		 $scope.imageStrings = [];
		 $scope.processFiles = function(files) {
		    angular.forEach(files, function(flowFile, i) {
		        var fileReader = new FileReader();
		          fileReader.onload = function (event) {
		            var uri = event.target.result;
		              $scope.imageStrings[i] = uri;     
		          };
		          fileReader.readAsDataURL(flowFile.file);
		    });
		 };
		
	};
})();
