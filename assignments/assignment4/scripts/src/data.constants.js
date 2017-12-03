(function () {
'use strict';

angular.module('Data')
.constant('ApiCategories', "https://davids-restaurant.herokuapp.com/categories.json")
.constant('ApiItems', "https://davids-restaurant.herokuapp.com/menu_items.json");

})();
