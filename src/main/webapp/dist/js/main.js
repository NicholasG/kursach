(function () {
	'use strict';

	var main = angular.module('main', [
		'developer',
		'license',
		'software',
		'ui.router',
		'ui.bootstrap',
		'ngResource',
		'ngAnimate',
		'pascalprecht.translate',
		'base64',
		'flow',
		'ngDialog'
		])
	.config(configure).
	run(run);


	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
	function configure ($stateProvider, $urlRouterProvider, $translateProvider) {

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
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperCtrl', DeveloperCtrl);

	function DeveloperCtrl ($scope, $state, $http, $stateParams, ngDialog, DeveloperService) {
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
			ngDialog.open({ 
				template: '/app/modules/developer/action/developer.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'DeveloperEditCtrl',
				scope: $scope
			});
			sc.id = id; 
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/developer/action/developer.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'DeveloperNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/developer/action/developer.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'DeveloperDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, country) {
			if (name == '') name = null;
			if (country == '') country = null;
			
			DeveloperService.getPage(currentPage - 1, 10, name, country)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 

		$http.get('app/shared/dropdown/countries/countries.json').success(function (data) {
			sc.countriesWithFlags = data;
		});		
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
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.developer.table', {
			url: '',
			views: {
				'content@main.developer': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'DeveloperCtrl'
				},
				'filter@main.developer.table': {
					templateUrl: '/app/modules/developer/filter/developer.filter.view.html'
				}

			}
		})
		.state('main.developer.profile', { 
			url: '/:id',
			views: {
				'content@main.developer': {
					templateUrl: '/app/modules/developer/profile/developer.profile.view.html',
					controller: 'DeveloperProfileCtrl'
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
            return $http.get(urlBase, { 
                    params: { 
                        page: 0, 
                        size: 1000
                    }
                });
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

        this.uploadImage = function (file, id) {
            var fd = new FormData();
            fd.append('file', file);

            return $http.post(urlBase + '/upload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined },
                params: { id: id }
            });
        }

        this.getLogo = function (id) {
            return $http.get(urlBase + '/logo', { 
                    params: { 
                        id: id
                    }
            });
        }
    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseCtrl', LicenseCtrl);

	function LicenseCtrl($scope, $state, LicenseService, ngDialog) {
		var sc = $scope;
  
		sc.table = 'license';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'name', 
		'type',
		'minimumUsers',
		'maximumUsers',
		'expiration',
		'priceForOne'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/license/action/license.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'LicenseEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/license/action/license.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'LicenseNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id;
			ngDialog.open({ 
				template: '/app/modules/license/action/license.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'LicenseDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, type) {
			LicenseService.getPage(currentPage - 1, 10, name, type)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();

(function () {
	'use strict';

	var license = angular.module('license', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.license', {
			url: 'license',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.license.table', {
			url: '', 
			views: {
				'content@main.license': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'LicenseCtrl',
				},
				'filter@main.license.table': {
					templateUrl: '/app/modules/license/filter/license.filter.view.html'
				}
			}
		});

	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('LicenseService', function ($http) {

        var urlBase = '/license';

        this.getAll = function () {
            return $http.get(urlBase);
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (license) {
            return $http.post(urlBase, license);
        };

        this.update = function (license) {
            return $http.put(urlBase, license)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, name, type) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size ,
                        name: name,
                        type: type
                    }
            });
        };

    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareCtrl', SoftwareCtrl);

	function SoftwareCtrl ($scope, $state, SoftwareService, DeveloperService, LicenseService, ngDialog) {
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
			ngDialog.open({ 
				template: '/app/modules/software/action/software.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'SoftwareEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/software/action/software.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'SoftwareNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/software/action/software.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'SoftwareDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, release, devName, licName) {
			if (release != null) {
				var date = new Date(release);
				release = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			}

			SoftwareService.getPage(currentPage - 1, 10, name, release, devName, licName)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.devName = {};
		sc.licName = {};

		DeveloperService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		LicenseService.getAll().success( function (data) {
			sc.licensies = data.content;
		});

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
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.software.table', {
			url: '', 
			views: {
				'content@main.software': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'SoftwareCtrl',
				},
				'filter@main.software.table': {
					templateUrl: '/app/modules/software/filter/software.filter.view.html'
				}
			}
		})
		.state('main.software.profile', { 
			url: '/:id',
			views: {
				'content@main.software': {
					templateUrl: '/app/modules/software/profile/software.profile.view.html',
					controller: 'SoftwareProfileCtrl'
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
            return $http.get(urlBase, { 
                    params: { 
                        page: 0, 
                        size: 1000
                    }
                });
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

        this.getPage = function (currentPage, size, name, release, devName, licName) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size,
                        name: name,
                        release: release,
                        devName: devName,
                        licName: licName
                    }
            });
        };

        this.getImages = function (id) {
            return $http.get(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }

        this.deleteImageById = function (id) {
            return $http.delete(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }

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
				sc.closeThisDialog(true);
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
		var fileLimit = 2000000;
		var fileLimitSuccess = false;

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

				if (sc.name != '' 
	            	&& sc.country != '' 
	            	&& sc.city != '' 
	            	&& sc.street != '' 
	            	&& sc.email != '' 
	            	&& sc.zipcode != '' 
	            	&& sc.website != '' 
	            	&& sc.phoneNumber != ''
	            	&& sc.fax != ''
	            ) {
	                DeveloperService.update(sc.developer)
						.success(function() {
						    sc.closeThisDialog(true);
						    sc.loadPage(1);
						});
            	} else alert('Error');
			}
		});
	}
})();

(function() {
    'use strict';

    angular
    .module('main')
    .controller('DeveloperNewCtrl', DeveloperNewCtrl);

    function DeveloperNewCtrl($scope, $state, $location, $document, DeveloperService) {
        var sc = $scope;

        var fileLimit = 2000000;
        var fileLimitSuccess = false;

        sc.action = 'Add';

        sc.name = '';
        sc.country = '';
        sc.city = '';
        sc.street = '';
        sc.email = '';
        sc.zipcode = '';
        sc.website = '';
        sc.phoneNumber = '';
        sc.fax = '';

        sc.save = function() {
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
            };

            if (sc.name != '' 
            	&& sc.country != '' 
            	&& sc.city != '' 
            	&& sc.street != '' 
            	&& sc.email != '' 
            	&& sc.zipcode != '' 
            	&& sc.website != '' 
            	&& sc.phoneNumber != ''
            	&& sc.fax != ''
            ) {
                DeveloperService.new(sc.developer)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(1);
					});
            } else alert('Error');
        };

    };
})();

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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseDeleteCtrl', LicenseDeleteCtrl);

	function LicenseDeleteCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;
		var licName;

		LicenseService.get(sc.id)
	  		.success( function (data) {
	  			licName = data.name;
				sc.log = 'Are you sure you want to remove sicense ' + licName + '?';
	  		});

		sc.delete = function () {
			LicenseService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'License "'+ licName +'" could not be deleted because is in use yet';
			  }); 

		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseEditCtrl', LicenseEditCtrl);

	function LicenseEditCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;
		sc.action = 'Edit';

		LicenseService.get(sc.id)
		.success(function (data) {
			sc.license = data;

			sc.id = sc.license.id;
			sc.name = sc.license.name;
			sc.type = sc.license.type;
			sc.minimumUsers = sc.license.minimumUsers;
			sc.maximumUsers = sc.license.maximumUsers;
			sc.expiration = sc.license.expiration;
			sc.priceForOne = sc.license.priceForOne;
			sc.priceForTen = sc.license.priceForTen;
			sc.priceForHundred = sc.license.priceForHundred;

			sc.save = function () {
				sc.license = {
					'id': sc.id,
					'name': sc.name,
					'type': sc.type,
					'minimumUsers':sc.minimumUsers,
					'maximumUsers': sc.maximumUsers,
					'expiration': sc.expiration,
					'priceForOne': sc.priceForOne,
					'priceForTen': sc.priceForTen,
					'priceForHundred': sc.priceForHundred
				}

				if (sc.name != '' 
				&& sc.type != ''
				&& sc.minimumUsers != ''
				&& sc.maximumUsers != ''
				&& sc.expiration != ''
				&& sc.priceForOne != ''
				&& sc.priceForTen != ''
				&& sc.priceForHundred != ''
				) {
					LicenseService.update(sc.license)
					.success(function (data) {
						sc.license = null;
						sc.closeThisDialog(true);
						sc.loadPage(1);
					});
				}
				else alert('Error');
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseNewCtrl', LicenseNewCtrl);

	function LicenseNewCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = '';
		sc.type = '';
		sc.minimumUsers = '';
		sc.maximumUsers = '';
		sc.expiration = '';
		sc.priceForOne = '';
		sc.priceForTen = '';
		sc.priceForHundred = '';
		
		sc.save = function () {
			sc.license = {
				'name': sc.name,
				'type': sc.type,
				'minimumUsers':sc.minimumUsers,
				'maximumUsers': sc.maximumUsers,
				'expiration': sc.expiration,
				'priceForOne': sc.priceForOne,
				'priceForTen': sc.priceForTen,
				'priceForHundred': sc.priceForHundred
			}

			if (sc.name != '' 
				&& sc.type != ''
				&& sc.minimumUsers != ''
				&& sc.maximumUsers != ''
				&& sc.expiration != ''
				&& sc.priceForOne != ''
				&& sc.priceForTen != ''
				&& sc.priceForHundred != ''
				) {
				LicenseService.new(sc.license)
				.success(function (data) {
					sc.license = null;
					sc.closeThisDialog(true);
					sc.loadPage(1);
				});
			}
			else alert('Error');
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
				sc.loadPage(1);
				sc.closeThisDialog(true);
			});
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareEditCtrl', SoftwareEditCtrl);

	function SoftwareEditCtrl ($scope, $state, $location, SoftwareService, DeveloperService, LicenseService) {
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

			sc.selDeveloper = sc.software.developer;
			sc.selLicense = sc.software.license;

			DeveloperService.getAll().success( function (data) {
				sc.developers = data.content;
			});

			LicenseService.getAll().success( function (data) {
				sc.licensies = data.content;
			});

			sc.save = function () {
				sc.soft = {
					'id': sc.id,
					'name': sc.name,
					'version': sc.version,
					'release': sc.release.getFullYear() + '-' + (sc.release.getMonth() + 1) + '-' + sc.release.getDate(),
					'license': sc.selLicense,
					'developer': sc.selDeveloper,
					'windows': sc.windows,
					'linux': sc.linux,
					'macOS': sc.macOS
				}


			if (sc.name != '' 
				&& sc.version != ''
				&& sc.selDeveloper != {}
				&& sc.selLicense != {}
				) {
					SoftwareService.update(sc.soft)
					.success(function (data) {
						sc.loadPage(1);
						sc.soft = null;
					});
					sc.closeThisDialog(true);
				}
			else alert('Error');
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareNewCtrl', SoftwareNewCtrl);

	function SoftwareNewCtrl ($scope, $state, $location, SoftwareService, DeveloperService, LicenseService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = '';
		sc.version = '';
		sc.release = new Date();
		sc.license = '';
		sc.windows = false;
		sc.linux = false;
		sc.macOS = false;
		sc.selDeveloper = '';
		sc.selLicense = '';

		DeveloperService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		LicenseService.getAll().success( function (data) {
			sc.licensies = data.content;
		});

		sc.save = function () {

			sc.soft = {
				'name': sc.name,
				'version': sc.version,
				'license': sc.selLicense,
				'developer': sc.selDeveloper,
				'release': sc.release.getFullYear() + '-' + sc.release.getMonth() + '-' + sc.release.getDate(),
				'windows': sc.windows,
				'linux': sc.linux,
				'macOS': sc.macOS
			}

		if (sc.name != '' 
			&& sc.version != ''
				&& sc.selLicense != ''
				&& sc.selDeveloper != ''
				) {
				SoftwareService.new(sc.soft)
				.success(function (data) {
					sc.loadPage(1);
					sc.soft = null;
					sc.closeThisDialog(true);
				});
			}
			else alert('Error');
		}
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareProfileCtrl', SoftwareProfileCtrl);

	function SoftwareProfileCtrl ($scope, $state, $stateParams, SoftwareService, DeveloperService, ngDialog) {
		var sc = $scope;
		sc.table = 'software';
		sc.imgIndex = 0;

		sc.target = { 
				target: '/soft/images?id=' + $stateParams.id,
				testChunks: false
			};

		sc.getImage = function (index) {
			sc.imgIndex = index;
		}

		sc.getImageId = function (index) {
			return sc.images[sc.imgIndex].id;
		}
 
		SoftwareService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;

	  			DeveloperService.getLogo(data.developer.id)
	  			.success( function (data) {
	  				sc.devLogo = data.logo;
	  			});
	  		});

	  	sc.getImages = function () {
	  		SoftwareService.getImages($stateParams.id)
	  		.success( function (data) {
	  			sc.images = data;
				if (sc.images != '') sc.currentImage = sc.images[0].image;
	  		});	  	
	  	}

	  	sc.openImageById = function (index) {
			ngDialog.open({ 
				template: '/app/shared/image/image.fullsreen.view.html', 
				className: 'ngdialog-theme-image-view',
				showClose: false,
				scope: $scope
			});
			sc.imgIndex = index;
		};

		sc.deleteImage = function (id) {
			SoftwareService.deleteImageById(id).success( function (data) {
	  			sc.getImages();
	  		});	 
		}

		sc.previousImage = function () {
			if (sc.imgIndex == 0) sc.imgIndex = sc.images.length;
			sc.imgIndex --;
		}

		sc.nextImage = function () {
			sc.imgIndex ++;
			if (sc.imgIndex == sc.images.length) sc.imgIndex = 0;
		}

	  	sc.getImages();
	};
})();
