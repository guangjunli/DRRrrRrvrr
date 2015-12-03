angular.module('googleDRRrrRrvrr')
.factory('googleDriveService', ['$http', '$window', 'googleApiReadyService', function($http, $window, googleApiReadyService) {

  return {
    //save the value here so it's kept when list controller is re-created whenever
    //there is back and forth between list and doc views
    maxNumberOfResults: 5,

    listDocuments: function() {
      var that = this;

      return googleApiReadyService.getClient().then(function() {
        return gapi.client.load('drive', 'v2');
      }).then(function() {
        //executes after api client loads
        var request = gapi.client.drive.files.list({
            'maxResults': that.maxNumberOfResults,
            'q': "mimeType = 'application/vnd.google-apps.document'"
        });

        return request;

      }).then(function(resp) {
          //response for the request
          return resp.result;
      });
    },

    loadDocument: function(fileId) {
      return googleApiReadyService.getClient().then(function() {
        return gapi.client.load('drive', 'v2');
      }).then(function() {
        //executes after api client loads
        var request = gapi.client.drive.files.get({fileId: fileId});

        return request;

      }).then(function(resp) {
        var accessToken = gapi.auth.getToken().access_token;

        return $http({
          url: resp.result.exportLinks["text/plain"],
          method: "GET",
          headers: {
            'Authorization': "Bearer " + accessToken
          }
        });
      }).then(function(data) {
          return data.data;
      });
    }
  };
}]);
