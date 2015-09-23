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
