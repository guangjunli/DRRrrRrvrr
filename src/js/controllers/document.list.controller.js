'use strict';

angular.module('googleDRRrrRrvrr')
.controller('DocumentListController', ['googleDriveService', '$log', function(googleDriveService, $log) {
  var vm = this;

  function appendLink(id, text){
    if(id != ''){
      var li = $('<li></li>');
      var link = $('<a></a>');
      link.attr('href', '/doc.html#'+id);
      console.log('id ' + id);
      link.html(text);
      li.append(link);
      $('#output ul').append(li);
    } else {
      $('#output').append(text);
    }
  }

  vm.listDocuments = function() {
    //TODO the init call here is kind of weird, but the service
    //cannot initialize itself - the google api loading is done in
    //the auth directive code ... need to understand the sequence

    googleDriveService.listDocuments().then(function(result) {
      var files = result.items;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          appendLink(file.id, file.title);
        }
      } else {
        appendLink('', 'No files found.');
      }
    });
  }

}]);
