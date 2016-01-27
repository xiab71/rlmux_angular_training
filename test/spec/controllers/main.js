'use strict';

angular.module('mock.localStorageService', []).
  factory('localStorageService', function() {
    var localStorageService = {};

    localStorageService.get = function(key) {
      if (key == 'todos') {
        return ["Item 1", "Item 2", "Item 3", "Item 4"];
      }

      return [];
    };

    // example stub method that returns a promise, e.g. if original method returned $http.get(...)
    localStorageService.set = function(key, value) {
    };

    // other stubbed methods

    return localStorageService;
  });

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('rlmuxApp'));

  beforeEach(module('mock.localStorageService'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _localStorageService_) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      localStorageService: _localStorageService_
      // place here mocked dependencies
    });
  }));

  it('should attach a list of todos to the scope', function () {
    expect(scope.todos.length).toBe(4);
  });
});
