angular.module('googleDRRrrRrvrr')
.directive('googleAuthButton',
  ['$window', 'gooleDriveConfig', 'googleApiReadyService', 'googleApiService',
   function($window, gooleDriveConfig, googleApiReadyService, googleApiService) {

  var authorizeButton;

  return {
    restrict: 'E',
    scope: {callback: '&postAuth'},
    link: function(scope, element, attrs) {

      var handleAuthResult = function(authResult) {
        if (authResult && !authResult.error) {
          //don't show the authorize button
          if (authorizeButton) {
            authorizeButton.remove();
          }

          //PAY ATTENTION TO NORMALIZED ATTR NAME
          //var postAuthorizationCallback = attrs['post-auth'];
          /*
          var postAuthorizationCallback = attrs['postAuth'];
          if (postAuthorizationCallback) {
            postAuthorizationCallback();
          }
          */
          //the above approach does not work giving error that is not function.
          //changed based on reference below. note the scope: change above
          //http://stackoverflow.com/questions/17556703/angularjs-directive-call-function-specified-in-attribute-and-pass-an-argument-to

          var postAuthorizationCallback = scope.callback();
          if (postAuthorizationCallback) {
            postAuthorizationCallback();
          }
          googleApiReadyService.clientReady();

        } else {
          // Show auth button, allowing the user to initiate authorization by clicking it
          if (! authorizeButton) {
            var messsage = attrs.message || 'Authorize access to Google Drive API';
            authorizeButton = angular.element('<button>' + messsage +'</button>');

            //changed from append to replaceWith from unit testing
            //not sure if this practice is a good practice though
            //element.append(authorizeButton);
            element.replaceWith(authorizeButton);

            authorizeButton.bind('click', function() {
              googleApiService.authorize(
                {client_id: gooleDriveConfig.CLIENT_ID, scope: gooleDriveConfig.SCOPES, immediate: false},
                handleAuthResult);
            });
          }
        }
      };

      $window.authGoogleApi = function() {

        //To improve the user experience, gapi.auth.authorize supports an "immediate" mode,
        //which refreshes the token without a popup. checkAuth calls authorize with immediate: true
        //as in the example above.
        //https://developers.google.com/api-client-library/javascript/features/authentication

        googleApiService.authorize(
          {
            'client_id': gooleDriveConfig.CLIENT_ID,
            'scope': gooleDriveConfig.SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      };
    }
  };
}]);
