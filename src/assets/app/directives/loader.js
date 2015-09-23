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
