(function () {
	'use strict';

	var main = angular.module('main', [
		'developer',
		'workers',
		'software',
		'ui.router',
		'ui.bootstrap',
		'ngResource',
		'pascalprecht.translate'
		])
	.config(configure).
	run(run);


	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
	function configure($stateProvider, $urlRouterProvider, $translateProvider) {

		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go('main.home');
		});

		$stateProvider
		.state('main', {
			url: '/',
			abstract: true,
			templateUrl: '/app/components/main/main.view.html',
			controller: 'SidebarCtrl'
		})
		.state('main.home', {
			url: 'home',
			views: {
				'': {
					templateUrl: '/app/components/home/home.view.html'
				}
			}
		});

		$translateProvider.useStaticFilesLoader({
            prefix: '/app/resources/lang/',
            suffix: '.json'
          });
	}

	function run($translate, $rootScope, $templateCache) {
		// $translate.use('en');

		// $rootScope.$on('$viewContentLoaded', function() {
  //     		$templateCache.removeAll();
  //  		});

	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperCtrl', DeveloperCtrl);

	function DeveloperCtrl ($scope, $state, $http, $translate, DeveloperService) {
		var sc = $scope;

		sc.table = 'developer';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'country',
		'email',
		'website',
		'phoneNumber',
		'fax'
		];

		sc.openEdit = function (id) {
			$state.go('main.developer.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.developer.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.developer.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			if (sc.name == '') sc.name = null;
			if (sc.country == '') sc.country = null;
			
			DeveloperService.getPage(currentPage - 1, 10, sc.name, sc.country)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 

		$http.get('app/shared/dropdown/countries/countries.json').success(function (data) {
			sc.countriesWithFlags = data;
		});

		// sc.keys = Object.keys(sc.country);
		
	};
})();

(function () {
	'use strict';

	var developer = angular.module('developer', [
		'ui.router'
		])
	.config(configure);
 

	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.developer', {
			url: 'developer',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'DeveloperCtrl'
				}
			}
		})
		.state('main.developer.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/developer/action/developer.action.view.html',
					controller: 'DeveloperNewCtrl'
				}
			}
		})
		.state('main.developer.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/developer/action/developer.action.view.html',
					controller: 'DeveloperEditCtrl'
				}
			}
		})
		.state('main.developer.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/developer/action/developer.action.delete.view.html',
					controller: 'DeveloperDeleteCtrl'
				}
			}
		});

	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('DeveloperService', function ($http) {

        var urlBase = '/dev';

        this.getAll = function () {
            return $http.get(urlBase);
        };  

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (dev) {
            return $http.post(urlBase, dev);
        };

        this.update = function (dev) {
            return $http.put(urlBase, dev)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, name, country) {
            return $http.get(urlBase, { 
                    params: { 
                        name: name,
                        country: country,
                        page: currentPage, 
                        size: size 
                    }
            });
        };

    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersCtrl', WorkersCtrl);

	function WorkersCtrl($scope, $state, WorkersService) {
		var sc = $scope;

		sc.table = 'workers';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'fullName', 
		'position',
		'birthday',
		'age',
		'sex',
		'experience',
		'previousPosition',
		'date'
		];

		sc.openEdit = function (id) {
			$state.go('main.workers.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.workers.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.workers.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			WorkersService.getPage(currentPage, 10)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.searchByField = function(field, value) {
			if (value != '') {
				WorkersService.searchByField(field, value)
				.success(function (data){
					sc.main = data;
				});
			}
			else sc.loadPage(1); 
		};

		sc.loadPage(1); 
	};

})();

(function () {
	'use strict';

	var workers = angular.module('workers', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.workers', {
			url: 'workers',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'WorkersCtrl',
				}
			}
		})
		.state('main.workers.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/workers/action/workers.action.view.html',
					controller: 'WorkersNewCtrl'
				}
			}
		})
		.state('main.workers.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/workers/action/workers.action.view.html',
					controller: 'WorkersEditCtrl'
				}
			}
		})
		.state('main.workers.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/workers/action/workers.action.delete.view.html',
					controller: 'WorkersDeleteCtrl'
				}
			}
		});

	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('WorkersService', function ($http) {

        var urlBase = '../data/workers/';

        this.getAll = function () {
            return $http.get(urlBase + 'workers.list.json');
        };

        this.get = function (id) {
            return $http.get(urlBase + id + '.json');
        };

        this.new = function (hotel) {
            return $http.post(urlBase, hotel);
        };

        this.update = function (id, hotel) {
            return $http.put(urlBase + id, hotel)
        };

        this.delete = function (id) {
            return $http.delete(urlBase + id);
        };

        this.searchByField = function (field, value) {
            return $http.get(urlBase + 'workers_search_' + field + '=' + value + '.json');
        };

        this.getPage = function (currentPage, size) {
            return $http.get(urlBase + 'workers_page=' + currentPage + '_size=' + size + '.json');
        };

    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareCtrl', SoftwareCtrl);

	function SoftwareCtrl ($scope, $state, SoftwareService, DeveloperService) {
		var sc = $scope;
		
		sc.table = 'software';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'version',
		'release',
		'developer',
		'license',
		'windows',
		'linux',
		'macOS'
		];

		sc.openEdit = function (id) {
			$state.go('main.software.edit');
			sc.id = id;
		}

		sc.openAdd = function () {
			$state.go('main.software.new');
		}

		sc.openDelete = function (id) {
			$state.go('main.software.delete');
			sc.id = id;
		}

		sc.close = function () {
			$state.go('main.' + sc.table);
		}

		sc.loadPage = function(currentPage) {
			if (sc.name == '') sc.name = null;
			if (sc.country == '') sc.country = null;
			
			SoftwareService.getPage(currentPage - 1, 10, sc.name, sc.country)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();

(function () {
	'use strict';

	var software = angular.module('software', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.software', {
			url: 'software',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'SoftwareCtrl',
				}
			}
		})
		.state('main.software.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/software/action/software.action.view.html',
					controller: 'SoftwareNewCtrl'
				}
			}
		})
		.state('main.software.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/software/action/software.action.view.html',
					controller: 'SoftwareEditCtrl'
				}
			}
		})
		.state('main.software.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/software/action/software.action.delete.view.html',
					controller: 'SoftwareDeleteCtrl'
				}
			}
		});

	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('SoftwareService', function ($http) {

        var urlBase = '/soft';

        this.getAll = function () {
            return $http.get(urlBase);
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (software) {
            return $http.post(urlBase, software);
        };

        this.update = function (software) {
            return $http.put(urlBase, software)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size 
                    }
            });
        };

    });

})();

(function () {
    'use strict';

    angular
    .module('main')
    .filter('phone', function () {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

            default:
            return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SidebarCtrl', SidebarCtrl);

	function SidebarCtrl($scope, $location) {  
		var sc = $scope;   

        sc.location = function() {
            return $location.path();
        }    
    }
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('TableCtrl', TableCtrl);

	function TableCtrl($scope, $state, $http) {  
		var sc = $scope;
		
    	sc.field = sc.tableHeader[0];

        sc.setField = function(field) {
            sc.field = field;
        }

        //Sort 
        sc.fieldName = undefined;
        sc.reverse = false;

        sc.sort = function(fieldName) {
            sc.reverse = (sc.fieldName === fieldName) ? !sc.reverse:false;
            sc.fieldName = fieldName;
        }

        sc.isSortUp = function(fieldName) {
        	return sc.fieldName === fieldName && !sc.reverse;
        };

        sc.isSortDown = function(fieldName) {
        	return sc.fieldName === fieldName && sc.reverse;
        };
    }
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('TranslateCtrl', TranslateCtrl);

	function TranslateCtrl ($scope, $translate) {
		var sc = $scope;
		
		$translate.use('en');

		sc.setLang = function(language) {
			$translate.use(language.toString());
			alert();
		};
		
	};
})();

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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperDeleteCtrl', DeveloperDeleteCtrl);

	function DeveloperDeleteCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;
		var devName;

		DeveloperService.get(sc.id)
	  		.success( function (data) {
	  			devName = data.name;
				sc.log = 'Are you sure you want to remove developer ' + devName + '?';
	  		});
 

		sc.delete = function () {
			DeveloperService.delete(sc.id)
			.then(function successCallback(response) {
			    alert('deleted' + sc.id);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'Developer "' + devName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperEditCtrl', DeveloperEditCtrl);

	function DeveloperEditCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;
		sc.action = 'Edit';

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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperNewCtrl', DeveloperNewCtrl);

	function DeveloperNewCtrl ($scope, $state, $location, DeveloperService) {
		var sc = $scope;

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
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersDeleteCtrl', WorkersDeleteCtrl);

	function WorkersDeleteCtrl ($scope, $state, $location, WorkersService) {
		var sc = $scope;

		sc.delete = function () {
			WorkersService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.hotel = null;
			});
		}
	};
})();

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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareDeleteCtrl', SoftwareDeleteCtrl);

	function SoftwareDeleteCtrl ($scope, $state, $location, SoftwareService) {
		var sc = $scope;

		sc.delete = function () {
			SoftwareService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.loadPage(1);
			});
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareEditCtrl', SoftwareEditCtrl);

	function SoftwareEditCtrl ($scope, $state, $location, SoftwareService, DeveloperService) {
		var sc = $scope;

		sc.action = 'Edit';

		SoftwareService.get(sc.id)
		.success(function (data) {
			sc.software = data;

			sc.id = sc.software.id;
			sc.name = sc.software.name;
			sc.version = sc.software.version;
			sc.releaseValue = sc.software.release;
			sc.license = sc.software.license;
			sc.developer = sc.software.developer;
			sc.windows = sc.software.windows;
			sc.linux = sc.software.linux;
			sc.macOS = sc.software.macOS;

			sc.release = new Date(sc.software.release);

			sc.selDeveloper = {};

			DeveloperService.getAll().success( function (data) {
				sc.developers = data.content;
			});

			sc.save = function () {
				sc.soft = {
					'id': sc.id,
					'name': sc.name,
					'version': sc.version,
					'release': sc.release.getFullYear() + '-' + (sc.release.getMonth() + 1) + '-' + sc.release.getDate(),
					'license': sc.license,
					'developer': sc.selDeveloper,
					'windows': sc.windows,
					'linux': sc.linux,
					'macOS': sc.macOS
				}

				SoftwareService.update(sc.soft)
				.success(function (data) {
					alert('updated!');
					sc.loadPage(1);
					sc.soft = null;
				});
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareNewCtrl', SoftwareNewCtrl);

	function SoftwareNewCtrl ($scope, $state, $location, SoftwareService, DeveloperService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = null;
		sc.version = null;
		sc.release = null;
		sc.license = null;
		sc.windows = false;
		sc.linux = false;
		sc.macOS = false;
		
		sc.selDeveloper = {};

		DeveloperService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		sc.save = function () {

			sc.soft = {
				'name': sc.name,
				'version': sc.version,
				'license': {"id":1,"name":"license1","type":"FREE","minimumUsers":1,"maximumUsers":100,"expiration":256,"priceForOne":0.0,"priceForTen":0.0,"priceForHundred":0.0},
				'developer': sc.selDeveloper,
				'release': sc.release.getFullYear() + '-' + sc.release.getMonth() + '-' + sc.release.getDate(),
				'windows': sc.windows,
				'linux': sc.linux,
				'macOS': sc.macOS
			}

			SoftwareService.new(sc.soft)
			.success(function (data) {
				alert('added!');
				sc.loadPage(1);
				sc.soft = null;
			});
		}
	}
})();
