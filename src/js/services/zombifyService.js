angular.module('googleDRRrrRrvrr')
.factory('zombifyService', ['ZOMBIFY_BASE_URL', '$http', '$q', '$log', function(ZOMBIFY_BASE_URL, $http, $q, $log) {

  return {
    zombify: function(plainText) {
      return $http({
        url: ZOMBIFY_BASE_URL + plainText,
        method: "GET",
      }).then(function successCallback(response) {
        return response.data.message;
      }, function errorCallback(response) {
        //TODO why the http response "414 Request-URI Too Long" header is NOT reflected in response object??
        var msg = "zombifyService failed with status " + response.status + " (" + response.statusText + ").";
        $log.warn(msg);

        //Initially forgot the 'return' which caused undefined to be returned
        //which is treated as 'resolve' by subsequent promise...
        //$q.reject(msg);
        return $q.reject(msg);
      });
    }
  };
}]);
