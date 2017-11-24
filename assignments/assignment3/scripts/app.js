(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.term = "";

  narrow.itDown = function () {
    if (narrow.term.length == 0) { return };
    MenuSearchService.searchMenuCategories()
    .then(function (data) {
      narrow.data = data;
      console.log(narrow.data);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }
};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.searchMenuCategories = function () {
    return $http(
      {
        method: "GET",
        url: ApiBasePath
      }).
      then(function (result) {
        return result.data
      });
  };

}

})();
