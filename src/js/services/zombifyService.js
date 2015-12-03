angular.module('googleDRRrrRrvrr')
.factory('zombifyService', ['ZOMBIFY_BASE_URL', '$http', '$log', function(ZOMBIFY_BASE_URL, $http, $log) {

  return {
    zombify: function(plainText) {
      return $http({
        url: ZOMBIFY_BASE_URL + plainText,
        method: "GET",
      }).then(function successCallback(response) {
        return response.data.message;
      }, function errorCallback(response) {
        //TODO why the http response "414 Request-URI Too Long" header is NOT reflected in response object??
        $log.warn("zombifyService returned status " + response.statusText + "(" + response.status + "). " + response.data);
        return "zombifyService failed.";
      });
    }
  };
}]);
