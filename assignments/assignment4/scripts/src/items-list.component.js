(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'scripts/src/templates/items-list.template.html',
  bindings: {
    items: '<'
  }
});

})();
