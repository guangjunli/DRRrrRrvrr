describe('Zombify Service', function() {
  var $httpBackend,
      $rootScope,
      zombifyService,
      ZOMBIFY_BASE_URL;

  beforeEach(angular.mock.module('googleDRRrrRrvrr'));

  beforeEach(angular.mock.inject(function($injector, _ZOMBIFY_BASE_URL_) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    zombifyService = $injector.get('zombifyService');
    ZOMBIFY_BASE_URL = _ZOMBIFY_BASE_URL_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should zombify word 'Drive' correctly", function() {
    var plainText = "Drive";
    var zombifiedText = "DRRrrRrvrr";

    //NOTE respond wraps the text argument in 'data' field already, that's why
    //the data field is commented out below. and this caused quite a bit of debugging
    var response = {
      //data: {
        message: zombifiedText
      //}
    };

    $httpBackend.expectGET(ZOMBIFY_BASE_URL + plainText).respond(200, response);

    zombifyService.zombify(plainText).then(function(zombieMessage) {
      expect(zombieMessage).toEqual(zombifiedText);
    });

    $httpBackend.flush();

    //NOTE this is not necessar anymore because flush() above make it synchronous???
    //$rootScope.$digest();
  });

  it("should handle failure properly", function() {
    var plainText = "Drive";

    var code = 500;
    var reason = 'simulated zombify failure';

    //http://www.bradoncode.com/blog/2015/06/29/unit-testing-http-ngmock-fundamentals-2/

    $httpBackend.expectGET(ZOMBIFY_BASE_URL + plainText).respond(code, null, null, reason);

    zombifyService.zombify(plainText).then(
      null,
      function(failureReason) {
        console.log(failureReason);
        expect(failureReason).toContain(code);
        expect(failureReason).toContain(reason);
      }
    );

    $httpBackend.flush();

    //NOTE this is not necessar anymore because flush() above make it synchronous???
    //$rootScope.$digest();
  });

});
