angular.module('googleDRRrrRrvrr')
.factory('googleApiReadyService', ['$q', '$window', 'gooleDriveConfig', function($q, $window, gooleDriveConfig) {

  var deferredAuth = $q.defer();
  var deferredClient = $q.defer();

  $window.initGoogleApi = function() {
    console.log("initial google api");

    //$window.authGoogleApi();
    /*
    gapi.auth.authorize(
      {
        'client_id': gooleDriveConfig.CLIENT_ID,
        'scope': gooleDriveConfig.SCOPES.join(' '),
        'immediate': true
      }, handleAuthResult);
      */
      deferredClient.resolve("client loaded");
      deferredAuth.resolve(gapi.auth.authorize(
            {
              'client_id': gooleDriveConfig.CLIENT_ID,
              'scope': gooleDriveConfig.SCOPES.join(' '),
              'immediate': true
            }));
  };

  return {
    getClient: function() {
      return deferredClient.promise;
    },

    getAuth: function() {
      return deferredAuth.promise;
      /*
      return gapi.auth.authorize(
            {
              'client_id': gooleDriveConfig.CLIENT_ID,
              'scope': gooleDriveConfig.SCOPES.join(' '),
              'immediate': true
            });
            */

    }
  };

}]);
