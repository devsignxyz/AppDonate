'use strict';

/**
 * @ngdoc overview
 * @name appDonateApp
 * @description
 * # appDonateApp
 *
 * Main module of the application.
 */
angular
  .module('appDonateApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
	'ui.router'
  ])
  .config(function ($stateprovider,$routeProvider) {
    $stateprovider
	
     // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                          controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
	
	// route for the find page
            .state('app.find', {
                url:'find',
                views: {
                    'content@': {
                        templateUrl : 'views/find.html',
                        controller  : 'FindController'                  
                    }
                }
            })
        
            // route for the bloodb page
            .state('app.bloodb', {
                url:'bloodb',
                views: {
                    'content@': {
                        templateUrl : 'views/bloodb.html',
                        controller  : 'BloodController'                  
                    }
                }
            })

            // route for the servs page
            .state('app.servs', {
                url: 'servs',
                views: {
                    'content@': {
                        templateUrl : 'views/servs.html',
                        controller  : 'ServController'
                    }
                }
            })

            // route for the perfildetail page
            .state('app.perfilDetail', {
                url: 'perfildetail/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/perfilDetail.html',
                        controller  : 'PerfildetailController'
                   }
                }
            })
	// route for the write page
            .state('app.write', {
                url: 'write',
                views: {
                    'content@': {
                        templateUrl : 'views/write.html',
                        controller  : 'writeController'
                   }
                }
            })
        
            // route for the favorite page
            .state('app.favoriteDonor', {
                url: 'favorites',
                views: {
                    'content@': {
                        templateUrl : 'views/favoriteDonor.html',
                        controller  : 'FavoriteController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;

        
