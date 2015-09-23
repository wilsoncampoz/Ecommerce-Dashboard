(function () {

  //Set UserCookie
  document.cookie="customerID=504311";

  var app = angular.module('MyDashboard',['ngRoute']);

  app.config(function($routeProvider, $locationProvider)
  {
     // remove o # da url
     $locationProvider.html5Mode(true);

     $routeProvider

     // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
     .when('/', {
        templateUrl : 'src/assets/app/views/dashboard.html',
        //controller     : 'DashboardController',
     })

     .when('/orders', {
       templateUrl : 'src/assets/app/views/orders.html',
        //controller     : 'OrdersController',
     })

     // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
     .when('/addresses', {
       templateUrl : 'src/assets/app/views/addresses.html',
        //controller  : 'AddressController',
     })

     // para a rota '/contato', carregaremos o template contato.html e o controller 'ContatoCtrl'
     .when('/info', {
       templateUrl : 'src/assets/app/views/info.html',
      //  controller  : 'CustomerInfoController',
     })

     // caso não seja nenhum desses, redirecione para a rota '/'
     .otherwise ({ redirectTo: '/' });
  });

})();

(function(){

angular.module('MyDashboard').factory('AddressFactory', AddressFactory);

function AddressItem(options){
  var info = options || {};

  this.receiverName = info.receiverName || "";
  this.cep = info.cep || "";
  this.street = info.street || "";
  this.noNumber = info.noNumber || false;
  this.number = info.number || "";
  this.complement = info.complement || "";
  this.neighborhood = info.neighborhood || "";
  this.city = info.city || "";
  this.state = info.state || "";
  this.addressType = info.addressType || "";
  this.referencePoint = info.referencePoint || "";
  this.isMainAddress = info.isMainAddress || false
};

function AddressesList(addressesList) {
  var addresses = [];
  _.forEach(addressesList, function (address) {
    addresses.push(new AddressItem(address));
  });
  return addresses;
}

function AddressFactory() {
  return {
    createAddressItem : AddressItem,
    createAddresses : AddressesList
  }
}

})();

(function() {
  angular.module('MyDashboard').factory('commonData', [CommonData]);

  function CommonData() {
    return {
      states : [
        { label : "Acre" , id : 'AC' },
        { label : "Alagoas" , id : 'AL' },
        { label : "Amapá" , id : 'AP' },
        { label : "Amazonas" , id : 'AM' },
        { label : "Bahia" , id : 'BA' },
        { label : "Ceará" , id : 'CE' },
        { label : "Distrito Federal" , id : 'DF' },
        { label : "Espiríto Santo" , id : 'ES' },
        { label : "Goiás" , id : 'GO' },
        { label : "Maranhão" , id : 'MA' },
        { label : "Mato Grosso" , id : 'MT' },
        { label : "Mato Grosso do Sul" , id : 'MS' },
        { label : "Minas Gerais" , id : 'MG' },
        { label : "Pará" , id : 'PA' },
        { label : "Paraíba" , id : 'PB' },
        { label : "Pernambuco" , id : 'PE' },
        { label : "Piauí" , id : 'PI' },
        { label : "Rio de Janeiro" , id : 'RJ' },
        { label : "Rio Grande do Norte" , id : 'RN' },
        { label : "Rio Grande do Sul" , id : 'RS' },
        { label : "Rondônia" , id : 'RO' },
        { label : "Roraima" , id : 'RR' },
        { label : "Santa Catarina" , id : 'SC' },
        { label : "São Paulo" , id : 'SP' },
        { label : "Sergipe" , id : 'SE' },
        { label : "Tocantins" , id : 'TO' },
      ],
      addressType : [
        { label : "Residencial", id : 0 },
        { label : "Comercial", id : 1 },
      ]
    }
  }
})();

(function(){

angular.module('MyDashboard').factory('CustomerFactory', CustomerFactory);

function Customer(options) {
  var info = options || {};

  this.name = info.name || "";
  this.cpf = info.cpf || "";
  this.telephone = info.telephone || "";
  this.email = info.email || "";
  this.gender = info.gender || "";
  this.birthDate = info.birthDate || "";
  this.newPassword = "";
  this.confirmNewPassword = "";
  this.wantNewsletter = info.wantNewsletter || false;
}

function CustomerFactory() {
  return {
    createCustomer : Customer
  }
}

})();

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

(function () {
  angular.module("MyDashboard").directive("loader", [function () {
    return {
      restrict : "A",
      link : function (scope, element, attr) {
        scope.$watch(attr.loader, function () {
          if(scope.$eval(attr.loader)){
            $(element).append('<div class="loader">');
          }
          else {
            $(element).find('.loader').fadeOut('slow', function () {
              $(this).remove();
            });
          }
        });
      }
    };
  }]);
})();
