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
