(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperDeleteCtrl', DeveloperDeleteCtrl);

	function DeveloperDeleteCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;
		var devName;

		DeveloperService.get(sc.id)
	  		.success( function (data) {
	  			devName = data.name;
				sc.log = 'Are you sure you want to remove developer ' + devName + '?';
	  		});

		sc.delete = function () {
			DeveloperService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			  }, function errorCallback(response) {
			    	sc.log = 'Developer "' + devName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();
