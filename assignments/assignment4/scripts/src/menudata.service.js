(function () {
  'use strict';

  angular.module('MenuApp')
    .service('MenuDataService', MenuDataService)

  function MenuDataService() {
    var service = this;

    service.getAllCategories = function () {
      // TODO: implement getAllCategories from API
    };

    service.getItemsForCategory = function (categoryShortName) {
      // TODO: implement get items for category from API

    }
  }

})();
