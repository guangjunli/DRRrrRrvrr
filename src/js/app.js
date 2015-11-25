angular.module('googleDRRrrRrvrr', []);

angular.module('googleDRRrrRrvrr')
.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    //TODO https://docs.angularjs.org/error/$location/nobase
    requireBase: false
  });
});

var gapiOnLoadCallback = function() {
  window.initGoogleApi();
}
