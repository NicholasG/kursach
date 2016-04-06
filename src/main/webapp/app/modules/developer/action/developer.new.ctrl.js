(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperNewCtrl', DeveloperNewCtrl);

	function DeveloperNewCtrl ($scope, $state, $location, $document, DeveloperService) {
		var sc = $scope;

		var fileLimit = 2000000;
		var fileLimitSuccess = false;

		sc.action = 'Add';

		sc.name = null;
		sc.country = null;
		sc.city = null;
		sc.street = null;
		sc.email = null;
		sc.zipcode = null;
		sc.website = null;
		sc.phoneNumber = null;
		sc.fax = null;

		sc.save = function () {
			sc.developer = {
					'name': sc.name,
					'country': sc.country.name,
					'city': sc.city,
					'street': sc.street,
					'email': sc.email,
					'zipcode': sc.zipcode,
					'website': sc.website,
					'phoneNumber': sc.phoneNumber,
					'fax': sc.fax
				}

			DeveloperService.new(sc.developer)
			.success(function (data) {
				alert('added!');
				sc.loadPage(1);
				sc.developer = null;
			});
		}
		var flow = new Flow({ 
				target: '/dev/logo' + sc.id,
				testChunks: false,
				singleFile: true
			});
			
		flow.on('fileAdded', function(file, event){
			if (file.size <= fileLimit) { fileLimitSuccess = true; }
			else {
				fileLimitSuccess = false;
				alert('This file is over 2Mb');
			}
		});

		window.onload = function(){
			flow.assignBrowse(document.getElementById('browseButton'));
		}
		// sc.someHandlerMethod( $files, $event, $flow )

	};
})();
