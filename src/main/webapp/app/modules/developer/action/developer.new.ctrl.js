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
					'country': sc.country,
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
			});
		}

		DeveloperService.getAll().success( function (data) {
			sc.contentLength = data.content.length;
		});

		sc.target = { 
				target: '/dev/logo?id=' + (sc.contentLength + 1),
				testChunks: false,
				singleFile: true
			};
		
		// sc.someHandlerMethod( $files, $event, $flow )

	};
})();
