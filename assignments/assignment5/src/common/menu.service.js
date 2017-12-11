(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', '$filter'];
function MenuService($http, ApiPath, $filter) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getSingleMenuItem = function (item_name) {
    service.getMenuItems().then(function (response) {
      return $filter('filter')(response.menu_items, item_name)[0];
    })
  }

  service.confirmShortName = function (shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json').then(function (response) {
      return true;
    });

  };

}



})();
