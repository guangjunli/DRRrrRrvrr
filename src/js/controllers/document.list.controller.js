angular.module('googleDRRrrRrvrr')
.controller('DocumentListController',
  ['googleApiReadyService', 'googleDriveService', '$scope', '$location',
    function(googleApiReadyService, googleDriveService, $scope, $location) {

  var vm = this;
  vm.files = [];
  vm.maxNumberOfResults = googleDriveService.maxNumberOfResults;

  //TODO added this flag to prevent "no file found" message from appearing
  //before loading completes. is this the best way?
  vm.loaded = false;
  vm.failedToLoad = undefined;

  vm.listDocuments = function() {
    //TODO the init call here is kind of weird, but the service
    //cannot initialize itself - the google api loading is done in
    //the auth directive code ... need to understand the sequence

    googleDriveService.maxNumberOfResults = vm.maxNumberOfResults;

    googleDriveService.listDocuments()
      .then(function(result) {
        vm.failedToLoad = undefined;
        vm.files = [];

        var files = result.items;
        if (files && files.length > 0) {
          //TODO try mapping the array :)
          for (var i = 0; i < files.length; i++) {
            vm.files.push({id: files[i].id, title: files[i].title});
          }

          vm.loaded = true;

          //TODO is it good/efficient to leave the body empty?
          //need to better understand the $digest loop
          /*
          $scope.$apply(function() {
          });
          */
          //TODO why the above has to be commented out when routing was introduced??
        }
      },
      function(reason) {
        vm.failedToLoad = reason;
      });
  };

  $scope.$on("$routeChangeSuccess", function () {
    if ($location.path().indexOf("/list") === 0) {
      vm.listDocuments();
    }
  });

}]);
