
describe('Goodle Drive Service', function() {
  describe('Through googleApiService', function() {
    var googleDriveService;
    var $rootScope;
    var googleApiService;
    var googleApiReadyService;
    var $q;

    beforeEach(angular.mock.module('googleDRRrrRrvrr'));

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
