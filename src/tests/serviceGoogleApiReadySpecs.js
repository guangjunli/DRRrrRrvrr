describe('Service for coordinating Google API Client loading', function() {
  /*
  reference
  http://brianmcd.com/2014/03/27/a-tip-for-angular-unit-tests-with-promises.html
  */

  var googleApiReadyService;
  var $rootScope;

  beforeEach(angular.mock.module('googleDRRrrRrvrr'));
  beforeEach(angular.mock.inject(function(_googleApiReadyService_, _$rootScope_) {
    googleApiReadyService = _googleApiReadyService_;
    $rootScope = _$rootScope_;
  }));

  it("resolves with default message", function() {
    var clientBeingLoaded = googleApiReadyService.getClient();

    clientBeingLoaded.then(function(message) {
      expect("google client loaded").toEqual(message);
    });

    googleApiReadyService.clientReady();
    $rootScope.$digest();
  });

  it("two callers with custom message", function() {
    var clientBeingLoaded = googleApiReadyService.getClient();
    var msg = "loaded";

    clientBeingLoaded.then(function(message) {
      expect(msg).toEqual(message);
    });

    clientBeingLoaded.then(function(message) {
      expect(msg).toEqual(message);
    });

    googleApiReadyService.clientReady(msg);
    $rootScope.$digest();
  });

  it("should notify the caller when client is ready", function() {
    var clientBeingLoaded = googleApiReadyService.getClient();
    var msg = "loaded";
    var clientLoadedCallback = jasmine.createSpy("handler");

    clientBeingLoaded.then(clientLoadedCallback);

    googleApiReadyService.clientReady(msg);
    $rootScope.$digest();
    expect(clientLoadedCallback).toHaveBeenCalledWith(msg);
  });
});
