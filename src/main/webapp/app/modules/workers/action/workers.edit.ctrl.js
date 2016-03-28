(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersEditCtrl', WorkersEditCtrl);

	function WorkersEditCtrl ($scope, $state, $location, WorkersService) {
		var sc = $scope;
		sc.action = 'Edit';

		WorkersService.get(sc.id)
		.success(function (data) {
			sc.worker = data;

			sc.fullName = sc.worker.name;
			sc.position = sc.worker.position;
			sc.birthday = sc.worker.birthday;
			sc.age = sc.worker.age;
			sc.sex = sc.worker.sex;
			sc.experience = sc.worker.experience;
			sc.previousPosition = sc.worker.previousPosition;
			sc.date = sc.worker.date;

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

				WorkersService.update(sc.id, sc.worker)
				.success(function (data) {
					alert('updated!');
					sc.worker = null;
				});
			}
		});
	}
})();
