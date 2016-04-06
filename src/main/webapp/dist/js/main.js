(function () {
	'use strict';

	var main = angular.module('main', [
		'developer',
		'license',
		'software',
		'ui.router',
		'ui.bootstrap',
		'ngResource',
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

	function DeveloperCtrl ($scope, $state, $http, $base64, $translate, ngDialog, DeveloperService) {
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

		sc.close = function () {
			$state.go('main.' + sc.table);
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

		 $scope.imageStrings = [];
		 $scope.processFiles = function(files) {
		    angular.forEach(files, function(flowFile, i) {
		        var fileReader = new FileReader();
		          fileReader.onload = function (event) {
		            var uri = event.target.result;
		              $scope.imageStrings[i] = uri;     
		          };
		          fileReader.readAsDataURL(flowFile.file);
		    });
		 };
		
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

	function LicenseCtrl($scope, $state, LicenseService) {
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
		'priceForOne',
		'priceForTen',
		'priceForHundred'
		];

		sc.openEdit = function (id) {
			$state.go('main.license.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.license.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.license.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			LicenseService.getPage(currentPage - 1, 10)
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
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'LicenseCtrl',
				}
			}
		})
		.state('main.license.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/license/action/license.action.view.html',
					controller: 'LicenseNewCtrl'
				}
			}
		})
		.state('main.license.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/license/action/license.action.view.html',
					controller: 'LicenseEditCtrl'
				}
			}
		})
		.state('main.license.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/license/action/license.action.delete.view.html',
					controller: 'LicenseDeleteCtrl'
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

		sc.getFilterView = function (table) {
        	return 'app/modules/' + table + '.filter.view.html';
        }

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
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.software.table', {
			url: '',
			views: {
				'content@main.software': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'SoftwareCtrl',
				}
			}
		})
		.state('main.software.new', {
			url: '/new',
			views: {
				'action @main.software': {
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
		.state('main.software.profile', { 
			url: '/:id',
			views: {
				'content@main.software': {
					templateUrl: '/app/shared/profile/profile.view.html',
					controller: 'SoftwareProfileCtrl'
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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('DeveloperProfileCtrl', DeveloperProfileCtrl);

	function DeveloperProfileCtrl ($scope, $state, $stateParams, DeveloperService) {
		var sc = $scope;
		sc.table = 'developer';

		DeveloperService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  		});

	  	DeveloperService.getLogo($stateParams.id)
	  		.success( function (data) {
	  			sc.devLogo = '';
	  			sc.devLogo = data;
	  		});

	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('LicenseDeleteCtrl', LicenseDeleteCtrl);

	function LicenseDeleteCtrl ($scope, $state, $location, LicenseService) {
		var sc = $scope;

		sc.delete = function () {
			LicenseService.delete(sc.id)
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

				LicenseService.update(sc.license)
				.success(function (data) {
					alert('updated!');
					sc.license = null;
					sc.loadPage(1);
				});
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

		sc.name = null;
		sc.type = null;
		sc.minimumUsers = null;
		sc.maximumUsers = null;
		sc.expiration = null;
		sc.priceForOne = null;
		sc.priceForTen = null;
		sc.priceForHundred = null;
		
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

			LicenseService.new(sc.license)
			.success(function (data) {
				alert('added!');
				sc.license = null;
				sc.loadPage(1);
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

	function SoftwareNewCtrl ($scope, $state, $location, SoftwareService, DeveloperService, LicenseService) {
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
		sc.selLicense = {};

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

			SoftwareService.new(sc.soft)
			.success(function (data) {
				alert('added!');
				sc.loadPage(1);
				sc.soft = null;
			});
		}
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareProfileCtrl', SoftwareProfileCtrl);

	function SoftwareProfileCtrl ($scope, $state, $stateParams, SoftwareService) {
		var sc = $scope;
		sc.table = 'software';

		SoftwareService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  			sc.columns = Object.keys(data);
	  		});


 
	};
})();
