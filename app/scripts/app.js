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
  .module('appDonateApp', ['ui.router','ngResource',
    'ngRoute','ngDialog',])
.config(function($stateProvider, $urlRouterProvider) 
        
        {
        $stateProvider
	
     // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                          
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller :
                        'HomeController'
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
                        controller  : 'findDonorController'                  
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
        
           // route for the needdetail page
        .state('app.needDetail',{
            
            url: 'help/:id',
            views: {
                
                'content@' : {
                    templateUrl:
                    'views/needDetail.html',
                    controller :
                    'NeedDetailController'
                }
            }
        })

            // route for the perfildetail page
            .state('app.perfildetail', {
                url: 'perfildetail/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/perfildetail.html',
                        controller  : 'PerfilDetailsController'
                   }
                }
            })
        
     
        
        
        
            .state('app.pinfo', {
                url: 'pinfo/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/pinfo.html',
                        controller  : 'infoController'
                   }
                }
            })
	// route for the write page
            .state('app.become', {
                url: 'become',
                views: {
                    'content@': {
                        templateUrl : 'views/become.html',
                        controller  : 'DonorController'
                   }
                }
            })
        
        // route for the about page
            .state('app.about', {
                url: 'about',
                views: {
                    'content@': {
                        templateUrl : 'views/about.html',
                        controller  : 'AboutController'
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
            })
    
            // route for the write us page
            .state('app.writeus', {
                url: 'writeus',
                views: {
                    'content@': {
                        templateUrl : 'views/writeus.html',
                        controller  : 'WriteController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;

        
