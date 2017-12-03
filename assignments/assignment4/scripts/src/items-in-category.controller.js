(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsInCategoryController', ItemsInCategoryController);

ItemsInCategoryController.$inject = ['data'];
function ItemsInCategoryController(data) {
  var ctrl = this;
  ctrl.items = data.menu_items;
  ctrl.category = data.category;
}
})();
