(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperEditCtrl', DeveloperEditCtrl);

	function DeveloperEditCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;
		sc.action = 'Edit';
		
		sc.formValid = false;
 
		sc.target = { 
				target: '/dev/logo?id=' + sc.id,
				testChunks: false,
				singleFile: true
			};

		DeveloperService.get(sc.id)
		.success(function (data) {
			sc.developer = data;

			sc.id = sc.developer.id;
			sc.name = sc.developer.name;
			sc.country = sc.developer.country;
			sc.city = sc.developer.city;
			sc.street = sc.developer.street;
			sc.email = sc.developer.email;
			sc.zipcode = sc.developer.zipcode;
			sc.website = sc.developer.website;
			sc.phoneNumber = sc.developer.phoneNumber;
			sc.fax = sc.developer.fax;

			sc.checkForm = function () {
	            if (sc.name != '' 
	                && sc.country != '' 
	                && sc.city != '' 
	                && sc.street != '' 
	                && sc.email != '' 
	                && sc.zipcode != '' 
	                && sc.website != '' 
	                && sc.phoneNumber != ''
	                && sc.fax != ''
	                && sc.devForm.$valid
	            ) sc.formValid = true;
		        else sc.formValid = false;
	        }
 
			sc.save = function () {
				sc.developer = {
					'id': sc.id,
					'name': document.getElementById('name').value,
					'country': sc.country,
					'city': sc.city,
					'street': sc.street,
					'email': sc.email,
					'zipcode': sc.zipcode,
					'website': sc.website,
					'phoneNumber': sc.phoneNumber,
					'fax': sc.fax 
				}
				
	            if (sc.formValid) DeveloperService.update(sc.developer)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(1);
					});
            	
			}
		});
	}
})();
