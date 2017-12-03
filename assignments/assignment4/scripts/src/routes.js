(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);


RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  // Redirect to "home" address
  $urlRouterProvider.otherwise('/');

  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'scripts/src/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'scripts/src/templates/main-categories.template.html',
    controller: 'MainCategoriesController as mainCategories',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{short_name}',
    templateUrl: 'scripts/src/templates/items-from-category.template.html',
    controller: 'ItemsInCategoryController as itemsCtrl',
    resolve: {
      data: ['$stateParams', 'MenuDataService',
      function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.short_name);
      }]
    }
  })
}

})();
