(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperProfileCtrl', DeveloperProfileCtrl);

	function DeveloperProfileCtrl ($scope, $state, $stateParams, DeveloperService) {
		var sc = $scope;
		sc.table = 'developer';

		DeveloperService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  			sc.columns = Object.keys(data);
	  		});


 
	};
})();
