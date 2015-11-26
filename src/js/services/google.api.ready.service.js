angular.module('googleDRRrrRrvrr')
.factory('googleApiReadyService', ['$q', '$window', function($q, $window) {

  var deferredClient = $q.defer();

  return {
    getClient: function() {
      return deferredClient.promise;
    },

    clientReady: function() {
      deferredClient.resolve("client loaded");
    }
  };

}]);
