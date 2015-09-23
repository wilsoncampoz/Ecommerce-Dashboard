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
