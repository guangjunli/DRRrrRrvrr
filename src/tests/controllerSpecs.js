
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
});
