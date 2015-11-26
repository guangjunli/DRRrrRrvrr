'use strict';

angular.module('googleDRRrrRrvrr')
.controller('DocumentDisplayController',
  ['googleDriveService', '$scope', '$location', '$routeParams', function(googleDriveService, $scope, $location, $routeParams) {

  var vm = this;

  vm.displayDocument = function() {
    //get the file id from routeParams instead
    //var fileId = $location.hash();
    if ($location.path().indexOf("/view/") == 0) {
      var fileId = $routeParams["id"];
      googleDriveService.loadDocument(fileId).then(function(data) {
        if (data) {
          vm.fileContent = data.replace(/\n/g, "<br>");
        } else {
          vm.fileContent = 'No content!';
        }

        $scope.$apply(function() {
        });
      });
    }
  };

  $scope.$on("$routeChangeSuccess", function () {
    if ($location.path().indexOf("/view") == 0) {
      vm.displayDocument();
    }
  });

}]);
