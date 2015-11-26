angular.module('googleDRRrrRrvrr')
.factory('zombifyService', ['ZOMBIFY_BASE_URL', '$http', function(ZOMBIFY_BASE_URL, $http) {

  return {
    zombify: function(plainText) {
      return $http({
        url: ZOMBIFY_BASE_URL + plainText,
        method: "GET",
      }).then(function(response) {
        return response.data.message;
      });
    }
  }
}]);
