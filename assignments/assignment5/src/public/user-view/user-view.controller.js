(function () {
"use strict";

angular.module('public')
.controller('UserViewController', UserViewController);

UserViewController.$inject = ['getUser']
function UserViewController(getUser) {
  var ctrl = this;
  console.log(getUser());
  ctrl.user = getUser();
}
}

)();
