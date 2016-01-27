'use strict';

/**
 * @ngdoc function
 * @name rlmuxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rlmuxApp
 */
angular.module('rlmuxApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
      localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function () {
      if ($scope.todo !== null && $scope.todo.trim() !== '') {
        $scope.todos.push($scope.todo);
        $scope.todo = '';
      }
    };
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };
  });
