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
      apiRequestFlag: '<',
      onDelete: '&'
    },
    controller: ListDataController,
    controllerAs: 'list',
    bindToController: true,
    link: ListDataLink
  };
};

function ListDataController() {
  var list = this;

  list.isApiRequestDone = () => { return list.apiRequestFlag == 2 };
  list.isApiRequestInProgress = () => { return list.apiRequestFlag == 1 };

  list.isListNotEmpty = () => { return !list.items || list.items.length > 0 };
  list.isApiResponseEmpty = () => { return !list.isListNotEmpty() && list.isApiRequestDone() };

};


function ListDataLink(scope, element, attrs, controller) {
  scope.$watch('list.isApiRequestInProgress()', function (newVal, oldVal) {
    if(newVal === true) { showLoader(); }
    else { hideLoader(); }
  });

  var showLoader = function() {
    element.find("div.loading_info").slideDown(300);
    element.find("div.table_info").slideUp(300);
  };

  var hideLoader = function() {
    element.find("div.loading_info").slideUp(500, function () {
      element.find("div.table_info").slideDown(100);
    });
  };
};


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.term = "";
  narrow.found = [];
  // Flag for checking Api Response, possibla values:
  // 0 => not started
  // 1 => in progress
  // 2 => done
  narrow.apiRequestFlag = 0;

  // Assign Api response to found and set apiRequestFlag
  var handleApiResponce = function (data) {
    narrow.found = data;
    narrow.apiRequestFlag = 2; // Set Api flag to done
  };

  // Download list from API
  narrow.itDown = function () {
     // Guardian Case:
    if (narrow.term.length == 0) {
      handleApiResponce([]);
      return
    };
    // Set Api flag to in progress:
    narrow.apiRequestFlag = 1;
    // Api call:
    MenuSearchService.searchMenuCategories(narrow.term)
    .then(function (data) { handleApiResponce(data); })
    .catch(function (error) { console.log("Error On Api Connection"); });
  }

  narrow.remove = (index) => { narrow.found.splice(index, 1); };
};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var checkSingleItem = (item, value) =>
  { return (item.description.toLowerCase().indexOf(value.toLowerCase()) != -1) };

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
