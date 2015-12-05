//This serves as a latch that allows Google API client usage
//only after it's loaded. Callers will obtain the client
//as a promise, which is resolved when the Google client loads.

angular.module('googleDRRrrRrvrr')
.factory('googleApiReadyService', ['$q', function($q) {

  var deferredClient = $q.defer();

  return {
    getClient: function() {
      return deferredClient.promise;
    },

    //the code waiting for this promise does not care about the
    //resolve message. so this is put in just for some fun.
    clientReady: function(message) {
      deferredClient.resolve(message || "google client loaded");
    },

    clientFailedToLoad: function(message) {
      deferredClient.reject(message || "google client failed to load");
    }
  };

}]);
