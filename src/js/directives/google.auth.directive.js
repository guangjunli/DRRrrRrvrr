angular.module('googleDRRrrRrvrr')
.directive('googleAuthButton', ['$window', function($window) {
  var CLIENT_ID = '225887424738-c10gg1shmdl1uhmkjd6umjpj9gfevo3i.apps.googleusercontent.com';
  var SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

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
                {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
                handleAuthResult);
            });
          }
        }
      };

      $window.initGoogleApi = function() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      };
    }
  };
}]);
