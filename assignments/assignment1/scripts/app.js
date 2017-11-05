(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController) ;
LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.mealsStatus = 0;
  $scope.mealsString = "";
  $scope.mealsEmptyDetection = false;

  $scope.mealsStatusShow = function () {
    return $scope.mealsStatus != 0;
  };

  $scope.mealsCheck = function () {
    var size = calculateMeals($scope.mealsString)
    if (size < 0) { $scope.mealsStatus = -1; return; }
    if ( size < 4) {
      $scope.mealsStatus = 1;
    } else {
      $scope.mealsStatus = 2;
    }

    if (size != $scope.mealsString.split(",").length) {
      $scope.mealsEmptyDetection = true;
    } else {
      $scope.mealsEmptyDetection = false;
    }
  };

  function calculateMeals(meals) {
    if (meals.replace(/\s|\,/g,'').length == 0) { return -1 };
    var size = 0;
    var array = meals.split(",");
    for (var i = 0; i < array.length; i++) {
      if (checkSingleMeal(array[i])) { size++;}
    };
    return size;
  };

  function checkSingleMeal(meal){
    meal.replace(/\s|\,/g,'').length != 0;
  };
}

})();
