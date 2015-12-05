
describe('Goodle Drive Service', function() {
  describe('Through googleApiService', function() {
    var googleDriveService;
    var $rootScope;
    var googleApiService;
    var googleApiReadyService;
    var $q;

    beforeEach(angular.mock.module('googleDRRrrRrvrr', function($exceptionHandlerProvider) {
      //http://stackoverflow.com/questions/31538364/promise-catch-does-not-catch-exception-in-angularjs-unit-test
      $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(angular.mock.inject(function(_googleDriveService_, _googleApiService_, _googleApiReadyService_, _$rootScope_, _$q_) {
      googleDriveService = _googleDriveService_;
      googleApiService = _googleApiService_;
      googleApiReadyService = _googleApiReadyService_;
      $rootScope = _$rootScope_;
      $q = _$q_;

      spyOn(googleApiService, "loadDrive").and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve("loaded");
        return deferred.promise;
      });
    }));

    it("should list the only two items", function() {
      spyOn(googleApiService, "listDriveDocuments").and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({"result": {"items": ["1", "2"]}});
        return deferred.promise;
      });

      var docListRequest = googleDriveService.listDocuments();

      docListRequest.then(function(result) {
        expect(result.items.length).toBe(2);
        expect(result.items[0]).toEqual("1");
        expect(result.items[1]).toEqual("2");
      });

      //this has to be called to kick off the resolution chain,
      //otherwise the test exits without "actually" running the test
      googleApiReadyService.clientReady();

      $rootScope.$digest();

      expect(googleApiService.listDriveDocuments).toHaveBeenCalled();
    });

    it("should handle failure to load js library", function() {
      spyOn(googleApiService, "listDriveDocuments");

      var msg = 'google js client library failed to load';
      googleApiReadyService.clientFailedToLoad(msg);

      var docListRequest = googleDriveService.listDocuments();

      docListRequest.then(null, function(result) {
        expect(result).toEqual(msg);
      });

      $rootScope.$digest();

      expect(googleApiService.loadDrive).not.toHaveBeenCalled();
      expect(googleApiService.listDriveDocuments).not.toHaveBeenCalled();
    });

    it("should handle failure to load drive client", function() {
      var msg = 'failed to load drive client';

      //line below caused "loadDrive has already been spied upon"
      //therefore instead of spying again, just redefine it
      //spyOn(googleApiService, "loadDrive").and.callFake(function() {
      googleApiService.loadDrive.and.callFake(function() {
        var deferred = $q.defer();
        deferred.reject(msg);
        return deferred.promise;
      });
      /*
      googleApiService.loadDrive.and.callFake(function() {
        return $q.reject(new Error(msg));
      });
      */


      spyOn(googleApiService, "listDriveDocuments");

      googleApiReadyService.clientReady();

      var docListRequest = googleDriveService.listDocuments();

      docListRequest.then(null, function(result) {
        expect(result).toEqual(msg);
      });

      $rootScope.$digest();

      expect(googleApiService.loadDrive).toHaveBeenCalled();
      expect(googleApiService.listDriveDocuments).not.toHaveBeenCalled();
    });

    //config below is the key to make this test pass
    //which makes the exception handling in unit test the same as in browser
    //$exceptionHandlerProvider.mode('log');
    it("should handle exception as rejection", function() {
      var msg = 'error loading drive client';

      googleApiService.loadDrive.and.throwError(msg);

      spyOn(googleApiService, "listDriveDocuments");

      googleApiReadyService.clientReady();

      var docListRequest = googleDriveService.listDocuments();

      docListRequest.then(null, function(result) {
        //note the follow expect will fail - pay attention to the ''
        //which indicates type mismatch
        //Expected Error: error loading drive client to equal 'Error: error loading drive client'.
        //expect(result).toEqual('Error: ' + msg);

        //working as expected:
        expect(result.message).toEqual(msg);
      });

      $rootScope.$digest();

      //expect(googleApiService.loadDrive).toHaveBeenCalled();
      expect(googleApiService.listDriveDocuments).not.toHaveBeenCalled();
    });

    it("should load document", function() {
      var content = "doc1 content";
      spyOn(googleApiService, "loadDriveDocument").and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({"data": content});
        return deferred.promise;
      });

      var docLoadRequest = googleDriveService.loadDocument();

      docLoadRequest.then(function(result) {
        expect(result).toEqual(content);
      });

      //this has to be called to kick off the resolution chain,
      //otherwise the test exits without "actually" running the test
      googleApiReadyService.clientReady();

      $rootScope.$digest();
    });

  });

  //testing attempt with gapi directly referenced in googleDriveService
  xdescribe('Goodle Drive Service with direct gapi reference', function() {
    var googleDriveService;
    var $rootScope;

    beforeEach(angular.mock.module('googleDRRrrRrvrr'));
    beforeEach(angular.mock.inject(function(_googleDriveService_, _$rootScope_) {
      googleDriveService = _googleDriveService_;
      $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
      /*
      var gapi = {
        client: {
          load: function() {},
          drive: {
            files: {
              list: function() {
              }
            }
          }
        }
      };
      */
      //TODO how to load gapi through karma is the issue here
      spyOn(gapi.client, 'load').and.returnValue(undefined);
      spyOn(gapi.client.drive.files, 'list').and.returnValue({"result": ["1", "2"]});
    });

    it("should load", function() {
      var documents = googleDriveService.listDocuments();
      console.log(JSON.stringify(documents));
    });
  });

});
