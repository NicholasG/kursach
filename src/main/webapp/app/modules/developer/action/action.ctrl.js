(function () {
	'use strict';

	angular
	.module('main')
	.controller('ActionCtrl', ActionCtrl);

	function ActionCtrl ($scope, $state, $location, HotelsService) {
		var sc = $scope;

		// sc.close = function (table)
		// 	$state.go('main.' + table);
		// }
	};
})();
