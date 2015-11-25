angular.module('googleDRRrrRrvrr')
.directive('googleAuthButton', ['$window', 'gooleDriveConfig', function($window, gooleDriveConfig) {

  var authorizeButton;

  function appendLink(id, text){
    if(id != ''){
      var li = $('<li></li>');
      var link = $('<a></a>');
      link.attr('href', '/doc.html#'+id);
      link.html(text);
      li.append(link);
      $('#output ul').append(li);
    } else {
      $('#output').append(text);
    }
  }

  function listFiles() {
    var request = gapi.client.drive.files.list({
        'maxResults': 10,
        'q': "mimeType = 'application/vnd.google-apps.document'"
      });

      request.execute(function(resp) {
        var files = resp.items;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            appendLink(file.id, file.title);
          }
        } else {
          appendLink('', 'No files found.');
        }
      });
  };

  return {
    restrict: 'E',
    scope: {},
    link: function(scope, element, attrs) {
      var handleAuthResult = function(authResult) {
        if (authResult && !authResult.error) {
          //don't show the authorize button
          if (authorizeButton) {
            authorizeButton.remove();
          }
          gapi.client.load('drive', 'v2', listFiles);

        } else {
          // Show auth button, allowing the user to initiate authorization by clicking it
          if (! authorizeButton) {
            var messsage = attrs['message'] || 'Authorize access to Google Drive API';
            authorizeButton = angular.element('<button>' + messsage +'</button>');
            element.append(authorizeButton);
            authorizeButton.bind('click', function() {
              gapi.auth.authorize(
                {client_id: gooleDriveConfig.CLIENT_ID, scope: gooleDriveConfig.SCOPES, immediate: false},
                handleAuthResult);
            });
          }
        }
      };

      $window.initGoogleApi = function() {
        gapi.auth.authorize(
          {
            'client_id': gooleDriveConfig.CLIENT_ID,
            'scope': gooleDriveConfig.SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      };
    }
  };
}]);
