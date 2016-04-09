(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareProfileCtrl', SoftwareProfileCtrl);

	function SoftwareProfileCtrl ($scope, $state, $stateParams, SoftwareService) {
		var sc = $scope;
		sc.table = 'software';

		SoftwareService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  		});

	  	SoftwareService.getImages($stateParams.id)
	  		.success( function (data) {
	  			sc.images = data;
	  		});
	};
})();
