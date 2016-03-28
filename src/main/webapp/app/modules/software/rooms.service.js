(function () {
    'use strict';

    angular.module('main')
    .service('RoomsService', function ($http) {

        var urlBase = '../data/rooms/';

        this.getAll = function () {
            return $http.get(urlBase + 'rooms.list.json');
        };

        this.get = function (id) {
            return $http.get(urlBase + id + '.json');
        };

        this.new = function (room) {
            return $http.post(urlBase, room);
        };

        this.update = function (id, room) {
            return $http.put(urlBase + id, room)
        };

        this.delete = function (id) {
            return $http.delete(urlBase + id);
        };

        this.searchByField = function (field, value) {
            return $http.get(urlBase + 'rooms_search_' + field + '=' + value + '.json');
        };

        this.getPage = function (currentPage, size) {
            return $http.get(urlBase + 'rooms_page=' + currentPage + '_size=' + size + '.json');
        };

    });

})();
