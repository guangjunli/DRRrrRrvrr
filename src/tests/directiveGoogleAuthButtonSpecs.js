//TOOD there is lots of code duplication among the three tests
//refactor to reduce duplication

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

    var testElement = angular.element('<div id="authorize-div"></div>');
    console.log(testElement.html()); //<== this will print blank ''. NOTE not sure if it's feature or bug

    testElement = angular.element('<div><div id="authorize-div"></div></div>');
    console.log(testElement.html()); //<== this will print <div id="authorize-div"></div>

    //TODO from the above two observations, it appears the top-level element is stripped off??
    //actually .html() gets the content of the element - not the element itself !!!

    var buttonMessage = 'Please Authorize access to Google Drive';
    var authorizeDiv = $compile(
      '<div id="authorize-div">' +
      '<google-auth-button message="' + buttonMessage + '"></google-auth-button>' +
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
    var buttonElement = authorizeDiv.find('button');
    expect(buttonElement).toBeDefined();
    expect(buttonElement.text()).toEqual(buttonMessage);
  });

  it('should not show authorization button if already authorized', function() {
    spyOn(googleApiService, "authorize").and.callFake(function() {
      var callback = arguments[1];

      callback({});
    });

    var testElement = angular.element('<div id="authorize-div"></div>');
    console.log(testElement.html()); //<== this will print blank ''. NOTE not sure if it's feature or bug

    testElement = angular.element('<div><div id="authorize-div"></div></div>');
    console.log(testElement.html()); //<== this will print <div id="authorize-div"></div>

    //TODO from the above two observations, it appears the top-level element is stripped off??
    //actually .html() gets the content of the element - not the element itself !!!

    var buttonMessage = 'Please Authorize access to Google Drive';
    var authorizeDiv = $compile(
      '<div id="authorize-div">' +
      '<google-auth-button message="' + buttonMessage + '"></google-auth-button>' +
      '</div>'
    )(scope);

    //before
    console.log(authorizeDiv.html());

    //NOTE this call is key to kick off the template compilation !!!
    $window.authGoogleApi();

    scope.$digest();

    //after
    console.log(authorizeDiv.html());

    var buttonElement = authorizeDiv.find('button');
    //TODO need to better understand the jQ APIs
    //console.log(buttonElement);
    expect(buttonElement.html()).toBeUndefined();
  });

  it('should show authorization button then button should disappear after authorization', function() {
    spyOn(googleApiService, "authorize").and.callFake(function() {
      var callback = arguments[1];

      //TODO better to check it's indeed a function and
      //then invoke it in a try-catch block
      callback({error: "not authorized yet"});
    });

    var testElement = angular.element('<div id="authorize-div"></div>');
    console.log(testElement.html()); //<== this will print blank ''. NOTE not sure if it's feature or bug

    testElement = angular.element('<div><div id="authorize-div"></div></div>');
    console.log(testElement.html()); //<== this will print <div id="authorize-div"></div>

    //TODO from the above two observations, it appears the top-level element is stripped off??
    //actually .html() gets the content of the element - not the element itself !!!

    var buttonMessage = 'Please Authorize access to Google Drive';
    var authorizeDiv = $compile(
      '<div id="authorize-div">' +
      '<google-auth-button message="' + buttonMessage + '"></google-auth-button>' +
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
    var buttonElement = authorizeDiv.find('button');
    expect(buttonElement).toBeDefined();
    expect(buttonElement.text()).toEqual(buttonMessage);

    //simulate clicking the auth button
    googleApiService.authorize.and.callFake(function() {
      var callback = arguments[1];

      callback({});
    });

    buttonElement.click();

    buttonElement = authorizeDiv.find('button');
    expect(buttonElement.html()).toBeUndefined();
  });

});
