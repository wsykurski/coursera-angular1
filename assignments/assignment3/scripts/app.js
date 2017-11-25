(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('listData', ListData);

function ListData() {
  return {
    templateUrl: 'templates/listData.html',
    scope: {
      items: '<',
      requestDone: '<',
      onDelete: '&'
    },
    controller: ListDataController,
    controllerAs: 'list',
    bindToController: true
  };
};

function ListDataController() {
  var list = this;

  list.isListNotEmpty = () => { return !list.items || list.items.length > 0 };
  list.isApiResponseEmpty = () => { return !list.isListNotEmpty() && list.requestDone };

};


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.term = "";
  narrow.found = [];
  narrow.isApiRequestDone = false;

  var assignApiResponce = function (data) {
    narrow.found = data;
    narrow.isApiRequestDone = true;
  };

  narrow.itDown = function () {
     // Guardian Case:
    if (narrow.term.length == 0) { return };
    // Api call:
    MenuSearchService.searchMenuCategories(narrow.term)
    .then(function (data) { assignApiResponce(data) })
    .catch(function (error) { console.log("Something went terribly wrong."); });
  }

  narrow.remove = (index) => { narrow.found.splice(index, 1); };
  narrow.termChanged = () => { narrow.isApiRequestDone = false };

};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var checkSingleItem = (item, value) =>
  { return (item.description.indexOf(value) != -1) };

  var searchDescription = function (list, value) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
      if(checkSingleItem(list[i], value)) { result.push(list[i]) };
    };
    return result;
  };

  service.searchMenuCategories = function (value) {
    return $http(
      {
        method: "GET",
        url: ApiBasePath
      })
      .then(function (result) {
        return searchDescription(result.data.menu_items, value);
      });
  };
}

})();
