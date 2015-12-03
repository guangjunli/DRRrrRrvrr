angular.module('googleDRRrrRrvrr', ['ngRoute', 'ngSanitize']);

angular.module('googleDRRrrRrvrr')
/*.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    //TODO https://docs.angularjs.org/error/$location/nobase
    requireBase: false
  });
})*/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/list", {
    templateUrl: "/templates/docs.list.html"
  });

  $routeProvider.when("/view/:id", {
    templateUrl: "/templates/doc.view.html"
  });

  $routeProvider.otherwise({
    redirectTo: '/list'
  });
}]);

angular.module('googleDRRrrRrvrr')
.constant('ZOMBIFY_BASE_URL', 'http://ancient-anchorage-9224.herokuapp.com/zombify?q=');

//this is referenced in index.html
//<script src="https://apis.google.com/js/client.js?onload=gapiOnLoadCallback"></script>
//the comment below is to prevent jshint to reporting 'gapiOnLoadCallback' is defined but never used.
/* exported gapiOnLoadCallback */
var gapiOnLoadCallback = function() {
  //the global authGoogleApi is defined in googleAuthButton directive
  window.authGoogleApi();
};
