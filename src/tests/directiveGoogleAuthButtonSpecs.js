describe('Google Auth Button', function() {
  var $compile,
      $window,
      $rootScope,
      scope,
      googleApiService;

  beforeEach(angular.mock.module('googleDRRrrRrvrr'));

  beforeEach(angular.mock.inject(function(_$window_, _$compile_, _$rootScope_, _googleApiService_){
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    googleApiService = _googleApiService_;

  }));

  it('should show authorization button without existing authorization', function() {
    spyOn(googleApiService, "authorize").and.callFake(function() {
      var callback = arguments[1];

      //TODO better to check it's indeed a function and
      //then invoke it in a try-catch block
      callback({error: "not authorized yet"});
    });

    var authorizeDiv = $compile(
      '<div id="authorize-div">' +
      '<google-auth-button message="Authorize access to Google Drive"></google-auth-button>' +
      '</div>'
    )(scope);

    //before
    console.log(authorizeDiv.html());

    //NOTE this call is key to kick off the template compilation !!!
    $window.authGoogleApi();

    scope.$digest();

    //after
    console.log(authorizeDiv.html());

    expect(authorizeDiv.children().length).toBe(1);
    var buttonElement = authorizeDiv.children()[0];
    //expect(buttonElement.)
    console.log(buttonElement.html());
    console.log(buttonElement.name);
    console.log(buttonElement.attr('message'));
    //expect(authorizeDiv.html()).toContain("lidless, wreathed in flame, 2 times");

    /*
      */
  });
});
