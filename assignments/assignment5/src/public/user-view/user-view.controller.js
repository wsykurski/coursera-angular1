(function () {
"use strict";

angular.module('public')
.controller('UserViewController', UserViewController);

UserViewController.$inject = ['getUser', 'getMenuItem']
function UserViewController(getUser, getMenuItem) {
  var ctrl = this;
  ctrl.user = getUser();
}
}

)();
