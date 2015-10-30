'use strict';

module.exports = ['$injector', '$q', function ($injector, $q) {
    return {
    responseError: function responseError(rejection) {
      if (rejection.status === 401 && rejection.config.url !== '/login') {
        var $state = $injector.get('$state');
        $state.go('login');
      }
      return $q.reject(rejection);
    }
  };
}];
