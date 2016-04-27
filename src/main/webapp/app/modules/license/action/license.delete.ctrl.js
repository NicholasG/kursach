(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseDeleteCtrl', LicenseDeleteCtrl);

	function LicenseDeleteCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;
		var licName;

		LicenseService.get(sc.id)
	  		.success( function (data) {
	  			licName = data.name;
				sc.log = 'Are you sure you want to remove sicense ' + licName + '?';
	  		});

		sc.delete = function () {
			LicenseService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			  }, function errorCallback(response) {
			    	sc.log = 'License "'+ licName +'" could not be deleted because is in use yet';
			  }); 

		}
	};
})();
