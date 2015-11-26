'use strict';

angular.module('googleDRRrrRrvrr')
.controller('DocumentListController',
  ['googleDriveService', '$scope', '$location', function(googleDriveService, $scope, $location) {

  var vm = this;
  vm.files = [];

  //TODO added this flag to prevent "no file found" message from appearing
  //before loading completes. is this the best way?
  vm.loaded = false;

  vm.listDocuments = function() {
    //TODO the init call here is kind of weird, but the service
    //cannot initialize itself - the google api loading is done in
    //the auth directive code ... need to understand the sequence

    googleDriveService.listDocuments().then(function(result) {
      var files = result.items;
      if (files && files.length > 0) {
        //TODO try mapping the array :)
        for (var i = 0; i < files.length; i++) {
          vm.files.push({id: files[i].id, title: files[i].title});
        }

        vm.loaded = true;

        //TODO is it good/efficient to leave the body empty?
        //need to better understand the $digest loop
        $scope.$apply(function() {
        });
      }
    });
  };

  $scope.$on("$routeChangeSuccess", function () {
    if ($location.path().indexOf("/list") == 0) {
      vm.listDocuments();
    }
  });

}]);
