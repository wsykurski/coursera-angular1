(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

function UserService() {
  var service = this;
  var user = null;
  service.getUser = () => { return user; }

  service.setUser = (newUser) => { user = newUser}

}
}

)();
