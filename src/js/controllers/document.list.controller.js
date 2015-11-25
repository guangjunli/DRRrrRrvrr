'use strict';

angular.module('googleDRRrrRrvrr')
.controller('DocumentListController', ['$log', function($log) {
  var vm = this;


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

  vm.listDocuments = function() {
    gapi.client.load('drive', 'v2', listFiles);
  }

}]);
