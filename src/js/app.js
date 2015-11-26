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

var gapiOnLoadCallback = function() {
  window.authGoogleApi();
}
