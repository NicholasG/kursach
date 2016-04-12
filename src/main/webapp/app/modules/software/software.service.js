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
