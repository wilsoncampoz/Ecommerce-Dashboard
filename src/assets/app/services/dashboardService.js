(function(){

  angular.module('MyDashboard').service('DashboardService', ['$http', '$timeout', '$q', 'AddressFactory',
  'CustomerFactory', DashboardService]);

  function DashboardService($http, $timeout, $q, AddressFactory, CustomerFactory){
    var customerInfo = undefined;

    // Get customerID from cookie;
    function getCustomerID() {
      //$cookies.get('customerID');
    };

    // Set CustomerInfo
    function setCustomerInfo(customerData) {
      return {
        info : new CustomerFactory.createCustomer(customerData.info),
        addresses : new AddressFactory.createAddresses(customerData.addresses),
        orders : customerData.orders
      }
    };

    this.saveData = function (customerData) {
      var customerDefer = $q.defer();

      $http({
        url : 'http://localhost:4000/users/504311',
        method: 'PUT',
        data: JSON.stringify(customerData)
      }).then(function(response) {
        //Timeout to simulate Loader State
        $timeout(function () {
          customerDefer.resolve(response);
        }, 1500);
      });
      return customerDefer.promise;
    };

    this.getCustomerInfo = function () {
      var customerDefer = $q.defer();

        $http({
          url : 'http://localhost:4000/users/504311',
          method : 'GET',
          cache: true,
        }).then(function(response) {
          //Timeout to simulate Loader State
          $timeout(function () {
            customerInfo = setCustomerInfo(response.data);
            customerDefer.resolve(customerInfo);
          }, 1500);
        });
        return customerDefer.promise;
      };
  };

})();
