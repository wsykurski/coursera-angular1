(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'scripts/src/templates/categories-list.template.html',
  bindings: {
    categories: '<'
  }
});

})();
