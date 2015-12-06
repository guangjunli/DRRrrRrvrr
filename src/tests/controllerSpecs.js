
describe('Controllers', function() {
  describe('DocumentListController', function() {
    var docListController,
        $q,
        $rootScope,
        googleDriveService;

    beforeEach(angular.mock.module('googleDRRrrRrvrr'));

    beforeEach(angular.mock.inject(function($controller, _googleDriveService_, _$q_, _$rootScope_) {

      googleDriveService = _googleDriveService_;
      $q = _$q_;
      $rootScope = _$rootScope_;

      //1
      //line below causes error without specifying the 2nd arg (scope)
      //http://errors.angularjs.org/1.4.8/$injector/unpr?p0=%24scopeProvider%20%3C-%20%24scope%20%3C-%20DocumentListController
      //2
      //it gave a different error if scope is an empty object, as the empty obj has no $on defined
      //TypeError: 'undefined' is not a function (evaluating '$scope.$on("$routeChangeSuccess", function () {
      //3
      //finally it works fine to create a new scope from $rootScope
      docListController = $controller('DocumentListController', {$scope: $rootScope.$new()});
    }));

    it('should be initialized to retrieve 5 documents by default', function(){
      expect(docListController.maxNumberOfResults).toEqual(googleDriveService.maxNumberOfResults);
      expect(docListController.maxNumberOfResults).toBe(5);
    });

    it('should load 3 documents', function(){
      spyOn(googleDriveService, "listDocuments").and.callFake(function() {
        var deferred = $q.defer();
        var result = {
          items: [
            {1: 'one'},
            {2: 'two'},
            {3: 'three'}
          ]
        };
        deferred.resolve(result);
        return deferred.promise;
      });

      docListController.listDocuments();

      //NOTE don't forget this anymore !!!
      $rootScope.$digest();

      expect(docListController.loaded).toBe(true);
      expect(docListController.files.length).toBe(3);
    });

    it('should have failed to load documents', function(){
      var failureMessage = 'unexpected error';

      spyOn(googleDriveService, "listDocuments").and.callFake(function() {
        var deferred = $q.defer();

        deferred.reject(failureMessage);
        return deferred.promise;
      });

      docListController.listDocuments();

      //NOTE don't forget this anymore !!!
      $rootScope.$digest();

      expect(docListController.loaded).toBe(false);
      expect(docListController.failedToLoad).toEqual(failureMessage);
    });

  });

  describe('DocumentDisplayController', function() {
    var documentDisplayController,
        $q,
        $rootScope,
        $location,
        googleDriveService,
        zombifyService;

    beforeEach(angular.mock.module('googleDRRrrRrvrr'));

    beforeEach(angular.mock.inject(function($controller, _googleDriveService_, _zombifyService_, _$q_, _$rootScope_, _$location_) {
      googleDriveService = _googleDriveService_;
      zombifyService = _zombifyService_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $location = _$location_;

      documentDisplayController = $controller('DocumentDisplayController', {$scope: $rootScope.$new()});

      spyOn($location, "path").and.callFake(function() {
        return "/view/";
      });

    }));

    it('should display plain doc and zombified doc', function(){
      var data = 'doc content';
      var zombieText = 'zombified doc content';

      spyOn(googleDriveService, "loadDocument").and.callFake(function() {
        var deferred = $q.defer();

        deferred.resolve(data);
        return deferred.promise;
      });

      spyOn(zombifyService, "zombify").and.callFake(function() {
        var deferred = $q.defer();

        deferred.resolve(zombieText);
        return deferred.promise;
      });

      documentDisplayController.displayDocument();

      $rootScope.$digest();
      expect(documentDisplayController.fileContent).toEqual(data.replace(/\n/g, "<br>"));
      expect(documentDisplayController.zombieContent).toEqual(zombieText);
    });

    it('should display plain doc but not zombified doc', function(){
      var data = 'doc content';
      var zombieText = 'service not available';

      spyOn(googleDriveService, "loadDocument").and.callFake(function() {
        var deferred = $q.defer();

        deferred.resolve(data);
        return deferred.promise;
      });

      spyOn(zombifyService, "zombify").and.callFake(function() {
        var deferred = $q.defer();

        deferred.reject(zombieText);
        return deferred.promise;
      });

      documentDisplayController.displayDocument();

      $rootScope.$digest();
      expect(documentDisplayController.fileContent).toEqual(data.replace(/\n/g, "<br>"));
      expect(documentDisplayController.zombieContent).toEqual('failed to zombify: ' + zombieText);
    });

    it('should display empty content properly', function(){
      spyOn(googleDriveService, "loadDocument").and.callFake(function() {
        var deferred = $q.defer();

        deferred.resolve(undefined);
        return deferred.promise;
      });

      documentDisplayController.displayDocument();

      $rootScope.$digest();
      expect(documentDisplayController.fileContent).toEqual('No content!');
      expect(documentDisplayController.zombieContent).toEqual('');
    });
  });
});
