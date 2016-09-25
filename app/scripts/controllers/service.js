'use strict';

/**
 * @ngdoc function
 * @name appDonateApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appDonateApp
 */
angular.module('appDonateApp')
  .constant("baseURL", "https://localhost:3000/")
.factory('donorFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "donor/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])
//write
.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])
//infofactory pagina infoemacion y home
.factory('infoFactory',['$resource', 'baseURL', function($resource,baseURL) {
    
          return $resource(baseURL + "information/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])
.factory('teamFactory',['$resource', 'baseURL', function($resource,baseURL) {
    
          return $resource(baseURL + "teamapp/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])


  });
