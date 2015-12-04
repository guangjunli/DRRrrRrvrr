angular.module('googleDRRrrRrvrr')
.factory('googleDriveService',
  ['$http', 'googleApiReadyService', 'googleApiService', function($http, googleApiReadyService, googleApiService) {

  return {
    //save the value here so it's kept when list controller is re-created whenever
    //there is back and forth between list and doc views
    maxNumberOfResults: 5,

    listDocuments: function() {
      var that = this;

      return googleApiReadyService.getClient()
        .then(function() {
          return googleApiService.loadDrive();
        })
        .then(function() {
          return googleApiService.listDriveDocuments(that.maxNumberOfResults);
        })
        .then(function(resp) {
          return resp.result;
        });
    },

    loadDocument: function(fileId) {
      return googleApiReadyService.getClient()
        .then(function() {
          return googleApiService.loadDrive();
        })
        .then(function() {
          return googleApiService.loadDriveDocument(fileId);
        })
        //the line between googleDriveService and googleApiService is quite blurred
        //the handling below could be put in googleApiService as well.
        .then(function(data) {
          return data.data;
        });

    }
  };
}]);
