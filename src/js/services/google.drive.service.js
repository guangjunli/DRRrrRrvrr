angular.module('googleDRRrrRrvrr')
.factory('googleDriveService', ['$log', function($log) {

  var googleApiClient;

  return {
    init: function() {
      googleApiClient = gapi.client.load('drive', 'v2');
    },

    listDocuments: function() {
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
    }
  };
}]);
