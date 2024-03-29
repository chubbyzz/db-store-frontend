'use strict';

angular
    .module('app')
    .controller('Product', Product)

Product.$inject = ['ProductFactory', 'Notification'];

function Product(ProductFactory, Notification) {
    var vm = this;

    vm.load = load;
    vm.setInfo = setInfo;
    vm.valueRangeChange = valueRangeChange;
    vm.loadMore = loadMore;
    vm.hasMoreProducts = true;


    vm.filters = {
        search: null,
        max: 0,
        min: 0,
        order: null
    };

    vm.page = 1;

    vm.setInfo();


    function load(){
        ProductFactory.search(vm.page, vm.filters).then(
                function(response) {
                    vm.hasMoreProducts = true;
                    vm.page = 1;
                    vm.records = response.data;
                });
    }

    function loadMore() {
        vm.page++;
        ProductFactory.search(vm.page, vm.filters).then(
            function(response) {
                console.log(response.data);
                if(response.data.length == 0) {
                    Notification.warning({title: "OPA", message: "Não temos mais produtos"});
                    vm.hasMoreProducts = false;
                } else {
                    vm.records = vm.records.concat(response.data);
                }
            });
    }

    function setInfo() {
        ProductFactory.info().then(
            function(response){
                vm.info = response.data;
                vm.filters.max = vm.info.max;
                vm.filters.min = vm.info.min;
                vm.load();
            });
    }

    function valueRangeChange() {
        if(vm.filters.min > vm.filters.max ) {
            vm.filters.min = vm.filters.max - 1;
        }
        if (vm.filters.max < vm.filters.min) {
            vm.filters.max = vm.filters.min + 1;
        }
    }
}