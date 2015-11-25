'use strict';

angular.module('googleDRRrrRrvrr')
.controller('DocumentDisplayController', ['googleDriveService', '$location', function(googleDriveService, $location) {
  var vm = this;

  vm.displayDocument = function() {
    var fileId = $location.hash();
    
    googleDriveService.loadDocument(fileId).then(function(data) {
      $('#output').html(data.replace(/\n/g, "<br>"));
    });
  }
}]);
