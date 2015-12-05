angular.module('googleDRRrrRrvrr')
.controller('DocumentDisplayController',
  ['googleDriveService', 'zombifyService', '$scope', '$location', '$routeParams', function(googleDriveService, zombifyService, $scope, $location, $routeParams) {

  var vm = this;
  vm.failedToLoad = undefined;

  vm.displayDocument = function() {
    //get the file id from routeParams instead
    //var fileId = $location.hash();
    if ($location.path().indexOf("/view/") === 0) {
      vm.failedToLoad = undefined;
      var fileId = $routeParams.id;
      googleDriveService.loadDocument(fileId)
        .then(function(data) {
          if (data) {
            zombifyService.zombify(data)
            .then(function(zombieMessage) {
                vm.zombieContent = zombieMessage;
              },
              function(reason) {
                vm.zombieContent = 'failed to zombify: ' + reason;
              }
            );

            vm.fileContent = data.replace(/\n/g, "<br>");

          } else {
            vm.fileContent = 'No content!';
            vm.zombieContent = '';
          }
        },
        function(reason) {
          vm.fileContent = 'failed to load file: ' + reason;
        }
      );
    }
  };

  $scope.$on("$routeChangeSuccess", function () {
    if ($location.path().indexOf("/view") === 0) {
      vm.displayDocument();
    }
  });

}]);
