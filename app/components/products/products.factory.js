'use strict';

angular
    .module('app')
    .factory('ProductFactory', ProductFactory);

ProductFactory.$inject = ['$http', 'baseUrl'];

function ProductFactory($http, baseUrl) {
    return {
        search: search,
        info: info,
        find: find,
        buy: buy,
        orders: orders
    }
    function search(page, filters) {
        if(filters.search == null || filters.search == "") delete filters.search;
        return $http.get(baseUrl + "products/" + page, {params: filters});
    }
    function info() {
        return $http.get(baseUrl + "products/info");
    }
    function find(slug) {
        return $http.get(baseUrl + "products/find/" + slug );
    }

    function buy(params) {
        return $http.post(baseUrl + 'orders/create', params);
    }

    function orders() {
        return $http.get(baseUrl + 'orders')
    }
}