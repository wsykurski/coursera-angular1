(function () {
"use strict";

angular.module('public')
.controller('UserViewController', UserViewController);

UserViewController.$inject = ['userItem', 'menuItems', '$filter', 'ApiPath']
function UserViewController(userItem, menuItems, $filter, ApiPath) {
  var ctrl = this;
  var findMenuItem = (menuItems, user) => {
    if (!user) { return null }
    return $filter('filter')(menuItems, user.shortName)[0];
  }
  ctrl.user = userItem;
  // ctrl.menuItem = $filter('filter')(menuItems.menu_items, ctrl.user.shortName);
  ctrl.menuItem = findMenuItem(menuItems.menu_items, ctrl.user);
  ctrl.imagePath = ApiPath;

}

}

)();
