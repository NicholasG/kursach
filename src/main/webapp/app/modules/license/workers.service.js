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
