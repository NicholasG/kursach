(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperProfileCtrl', DeveloperProfileCtrl);

	function DeveloperProfileCtrl ($scope, $state, $stateParams, ngDialog, DeveloperService) {
		var sc = $scope;
		sc.table = 'developer';

		sc.id = $stateParams.id;

		sc.target = { 
				target: '/dev/logo?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		DeveloperService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  		});

	  	sc.getLogoById = function (id) {
	  		DeveloperService.getLogo(id)
	  		.success( function (data) {
	  			sc.devLogo = '';
	  			sc.devLogo = data;
	  		});
	  	}

	  	sc.openLogoUpload = function () {
	  		ngDialog.open({ 
				template: '/app/modules/developer/profile/developer.logo.upload.view.html', 
				className: 'ngdialog-theme-default',
				showClose: true,
				scope: $scope
			});
	  	}

	  	sc.getLogoById(sc.id);

	};
})();
