'use strict';

angular.module('DeviseConfig', ['Devise'])
  .config(function(AuthProvider, AuthInterceptProvider) {
    // Customize login
    AuthProvider.loginPath('http://localhost:8080/brpm/session.json');

    // Customize logout
    AuthProvider.logoutPath('http://localhost:8080/brpm/users/logout');

    // Intercept 401 Unauthorized everywhere
    // Enables `devise:unauthorized` interceptor
    AuthInterceptProvider.interceptAuth(true);
  });
