angular.module('googleDRRrrRrvrr')
.factory('googleApiService', ['$http', function($http) {

  return {
    authorize: function(config, callback) {
      gapi.auth.authorize(config, callback);
    },

    loadDrive: function() {
      return gapi.client.load('drive', 'v2');
    },

    listDriveDocuments: function(maxNumberOfResults) {
      return gapi.client.drive.files.list({
          'maxResults': maxNumberOfResults,
          'q': "mimeType = 'application/vnd.google-apps.document'"
      });
    },

    loadDriveDocument: function(fileId) {
      return gapi.client.drive.files.get({fileId: fileId})
        .then(function(resp) {
          var accessToken = gapi.auth.getToken().access_token;

          return $http({
            url: resp.result.exportLinks["text/plain"],
            method: "GET",
            headers: {
              'Authorization': "Bearer " + accessToken
            }
          });
        });
    }
  };
}]);
