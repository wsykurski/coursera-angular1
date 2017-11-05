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
    var size = calculateMeals($scope.mealsString);
    $scope.mealsEmptyDetection = false;
    if (size < 0) {
      $scope.mealsStatus = -1;
      return; }
    if ( size < 4) {
      $scope.mealsStatus = 1;
    } else {
      $scope.mealsStatus = 2;
    }

    var sizeFromRegex = $scope.mealsString.split(",").length;
    if (size != sizeFromRegex && sizeFromRegex > 0) {
      $scope.mealsEmptyDetection = true;
    }
  };

  function calculateMeals(meals) {
    if (meals.replace(/\s|\,/g,'').length == 0) { return -1 };
    var size = 0;
    var array = meals.split(",");
    for (var i = 0; i < array.length; i++) {
      if (checkSingleMeal(array[i])) { size = size + 1;}
    };
    return size;
  };

  function checkSingleMeal(meal){
    return meal.replace(/\s/g,'').length != 0;
  };
}

})();
