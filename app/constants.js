'use static';

angular
    .module('app')
    .constant('baseUrl', 'http://localhost:3001/api/v1/')
    .constant('tokenType', 'Bearer');