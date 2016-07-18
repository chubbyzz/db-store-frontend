angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/components/products/index.view.html'
        })
        .when('/products/:slug', {
            templateUrl: 'app/components/products-details/show.view.html'
        })
        .when('/users/login', {
            templateUrl: 'app/components/login/login.view.html'
        })
        .when('/orders', {
            templateUrl: 'app/components/orders/index.view.html'
        });
}