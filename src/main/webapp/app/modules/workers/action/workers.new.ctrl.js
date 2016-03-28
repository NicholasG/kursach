(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersNewCtrl', WorkersNewCtrl);

	function WorkersNewCtrl ($scope, $state, $location, WorkersService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.fullName = null;
		sc.position = null;
		sc.birthday = null;
		sc.age = null;
		sc.sex = null;
		sc.experience = null;
		sc.previousPosition = null;
		sc.date = null;

		
		sc.save = function () {
			sc.worker = {
				'fullName': sc.fullName,
				'position':sc.position,
				'birthday': sc.birthday,
				'age': sc.age,
				'sex': sc.sex,
				'experience': sc.experience,
				'previousPosition': sc.previousPosition,
				'date': sc.date,
			}

			WorkersService.new(sc.worker)
			.success(function (data) {
				alert('added!');
				sc.worker = null;
			});
		}
	};
})();
