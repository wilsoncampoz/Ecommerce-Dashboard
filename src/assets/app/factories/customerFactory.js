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
