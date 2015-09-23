(function () {

  angular.module('MyDashboard').controller('MainController', ['$scope', '$location', 'DashboardService', 'AddressFactory', MainController]);

  function MainController ($scope, $location, DashboardService, AddressFactory) {
    $scope.loadingCustomerInfo = true;

    $scope.settings = {
      lockedForm : true
    };

    DashboardService.getCustomerInfo().then(function (customerInfo) {
      $scope.customer = customerInfo;
      $scope.info = $scope.customer.info;
      $scope.orders = $scope.customer.orders;
      $scope.addresses = $scope.customer.addresses;
      $scope.loadingCustomerInfo = false;
    });

    $scope.routeManager = function (path) {
      $location.path(path);
    };

    $scope.addNewAddress = function () {
        $scope.newAddress = new AddressFactory.createAddressItem();
    };

    $scope.saveNewAddress = function () {
      $scope.addresses.push($scope.newAddress);
      $scope.newAddress = undefined;
      $scope.saveData();
    };

    $scope.removeAddress = function (index) {
      $scope.addresses.splice(index, 1);
      $scope.saveData();
    };

    $scope.cancelNewAddress = function () {
      $scope.newAddress = undefined;
    };

    $scope.saveData = function () {
      $scope.loadingCustomerInfo = true;
      DashboardService.saveData($scope.customer).then(function () {
        $scope.loadingCustomerInfo = false;
      });
    };

    $scope.partials = {
      info : 'src/assets/app/partials/info-partial.html',
      address : 'src/assets/app/partials/address-partial.html',
      order : 'src/assets/app/partials/order-partial.html',
    };
  };

})();
