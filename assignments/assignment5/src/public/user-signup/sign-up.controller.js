(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['confirmShortName', 'getUser', 'setUser'];
function SignUpController(confirmShortName, getUser, setUser) {
  var ctrl = this;
  ctrl.user = { };
  ctrl.shortNameAlert = false;
  ctrl.success = false;
  ctrl.shortConfirm = (sn) => { return confirmShortName(sn)} ;
  ctrl.registerUser = function () {
    ctrl.shortConfirm(ctrl.user.shortName)
    .then(
      function () {
        ctrl.shortNameAlert = false;
        setUser(ctrl.user);
        ctrl.success = true;
      }
    )
    .catch(function () {
        ctrl.shortNameAlert = true;
        ctrl.success = false;
    })
  }
};
}

)()
