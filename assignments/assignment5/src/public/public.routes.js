(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.userview', {
      url: '/user/view',
      templateUrl: 'src/public/user-view/userview.html',
      controller: 'UserViewController',
      controllerAs: 'userViewController',
      resolve: {
        userItem: ['UserService', function (UserService) {
          return UserService.getUser();
        }],
        menuItems: ['MenuService', function (MenuService) {
           return MenuService.getMenuItems();
         }]
      }
    })
    .state('public.signup', {
      url: '/user/signup',
      templateUrl: 'src/public/user-signup/signup.html',
      controller: 'SignUpController',
      controllerAs: 'signUpCtrl',
      resolve: {
        confirmShortName: ['MenuService', function (MenuService) {
          return MenuService.confirmShortName
        }],
        setUser: ['UserService', function (UserService) {
          return UserService.setUser;
        }],
        getUser: ['UserService', function (UserService) {
          return UserService.getUser;
        }]
      }
    });

}
})();
