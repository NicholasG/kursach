(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperEditCtrl', DeveloperEditCtrl);

	function DeveloperEditCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;
		sc.action = 'Edit';
		var fileLimit = 2000000;
		var fileLimitSuccess = false;

		DeveloperService.get(sc.id)
		.success(function (data) {
			sc.developer = data;

			sc.id = sc.developer.id;
			sc.name = sc.developer.name;
			sc.country = { name: sc.developer.country }
			sc.city = sc.developer.city;
			sc.street = sc.developer.street;
			sc.email = sc.developer.email;
			sc.zipcode = sc.developer.zipcode;
			sc.website = sc.developer.website;
			sc.phoneNumber = sc.developer.phoneNumber;
			sc.fax = sc.developer.fax;

			var flow = new Flow({ 
				target: '/dev/logo?id=' + sc.id,
				testChunks: false,
				singleFile: true
			});
			flow.assignBrowse(document.getElementById('browseButton'));

			flow.on('fileAdded', function(file, event){
				if (file.size <= fileLimit) { fileLimitSuccess = true; }
				else {
					fileLimitSuccess = false;
					alert('This file is over 2Mb');
				}
			});
 
			sc.save = function () {
				sc.developer = {
					'id': sc.id,
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
    			if (fileLimitSuccess) flow.upload();  

				DeveloperService.update(sc.developer)
				.success(function (data) {
					alert('updated!');
					sc.loadPage(1);
					// sc.developer = null;
				});
			}
		});
	}
})();
