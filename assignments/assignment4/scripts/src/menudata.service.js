(function () {
'use strict';

angular.module('Data')
  .service('MenuDataService', MenuDataService)

MenuDataService.$inject = ['$http', 'ApiCategories', 'ApiItems'];
function MenuDataService($http, ApiCategories, ApiItems) {
  var service = this;

  service.getAllCategories = function () {
    return $http(
      {
        method: "GET",
        url: ApiCategories
      })
      .then(function (result) {
        return result.data;
      });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http(
      {
        method: "GET",
        url: ApiItems,
        params: {category: categoryShortName}
      })
      .then(function (result) {
        return result.data;
      });

  }
}

})();
