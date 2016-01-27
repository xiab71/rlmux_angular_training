'use strict';

/**
 * @ngdoc function
 * @name rlmuxApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the rlmuxApp
 */
angular.module('rlmuxApp').
  controller('LoginCtrl', function($scope, Auth) {
    var credentials = {
      login: 'admin',
      password: 'zaph0d'
    };
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    Auth.login(credentials, config).then(function(user) {
      console.log(user); // => {id: 1, ect: '...'}
    }, function(error) {
      // Authentication failed...
      console.log(error);
    });

    $scope.$on('devise:login', function(event, currentUser) {
      // after a login, a hard refresh, a new tab
      console.log(event);
      console.log(currentUser);
    });

    $scope.$on('devise:new-session', function(event, currentUser) {
      // user logged in by Auth.login({...})
      console.log(event);
      console.log(currentUser);
    });
  });

angular.module('rlmuxApp').
  factory('AppService', function ($resource) {
    return function(filter) {
      return $resource('http://127.0.0.1:8080/brpm/v1/apps?token=43c98b3ce588038395bde44994e8aab6b8a2e67f', {},
        {
          'app_list': {
            method: "GET",
            headers: {'Accept': 'application/json'},
            isArray: true,
            params: {}
          }
        });
    }
  });


angular.module('rlmuxApp').
  controller('AppCtrl', function($scope, AppService) {
    $scope.filter = '';
    $scope.apps = [];

    $scope.app_list = function (filter) {
      AppService(filter).app_list(filter).$promise.then(function (res) {
        $scope.apps = res;
      });
    };

    $scope.app_list($scope.filter);

    var envs = [];
    $scope.env_list = function(app) {
      envs = [];
      for (var i = 0; i < app.environments.length; i++) {
        envs.push(app.environments[i].name);
      }
      return envs;
    };

    var comps = [];
    $scope.comp_list = function(app) {
      comps = [];
      for (var i = 0; i < app.components.length; i++) {
        comps.push(app.components[i].name);
      }
      return comps;
    }
  });

angular.module('rlmuxApp').
  factory('ReleaseService', function ($resource) {
    return function(filter) {
      return $resource('http://127.0.0.1:8080/brpm/v1/plans?token=43c98b3ce588038395bde44994e8aab6b8a2e67f', {},
        {
          'release_list': {
            method: "GET",
            headers: {'Accept': 'application/json'},
            isArray: true,
            params: {}
          }
        });
    }
  });

angular.module('rlmuxApp').
  controller('ReleaseCtrl', function($scope, ReleaseService) {
    $scope.filter = '';
    $scope.releases = [];
    $scope.selected_release_stages = [];

    $scope.release_list = function (filter) {
      ReleaseService(filter).release_list(filter).$promise.then(function (res) {
        $scope.releases = res;
      });
    };

    $scope.release_list($scope.filter);

    $scope.select_release = function(name) {
      $scope.selected_release_stages = [];

      var stages = [];
      for (var i = 0; i < $scope.releases.length; i++) {
        if ($scope.releases[i].name == name) {
          var release = $scope.releases[i];
          var stage_instances = release.plan_stage_instances;
          for (var i = 0; i < stage_instances.length; i++) {
            stages.push(stage_instances[i].plan_stage.name);
          }
          break;
        }
      }
      $scope.selected_release_stages = stages;
    }
  });
