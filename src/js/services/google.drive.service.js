angular.module('googleDRRrrRrvrr')
.factory('googleDriveService', ['$http', function($http) {

  var googleApiClient;

  return {
    init: function() {
      googleApiClient = gapi.client.load('drive', 'v2');
    },

    listDocuments: function() {
      this.init();
      return googleApiClient.then(function() {
        //executes after api client loads
        var request = gapi.client.drive.files.list({
            'maxResults': 10,
            'q': "mimeType = 'application/vnd.google-apps.document'"
        });

        return request;

      }).then(function(resp) {
          //response for the request
          return resp.result;
      });
    },

    loadDocument: function(fileId) {
      this.init();

      return googleApiClient.then(function() {
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
