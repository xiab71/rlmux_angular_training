'use strict';

/**
 * @ngdoc overview
 * @name rlmuxApp
 * @description
 * # rlmuxApp
 *
 * Main module of the application.
 */
angular
  .module('rlmuxApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'RouterConfig',
    'ngSanitize',
    'DeviseConfig',
    'ui.sortable',
    'LocalStorageModule',
    'dpl_components'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }]);
