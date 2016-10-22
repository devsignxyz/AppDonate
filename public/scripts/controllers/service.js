/*globals angular */
"use strict";

/**
 * @ngdoc function
 * @name appDonateApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appDonateApp
 */
 angular.module("appDonateApp")
  .constant("baseURL", "https://localhost:3443/")
 .factory("donorFactory", ["$resource", "baseURL", function ($resource, baseURL) {

        return $resource(baseURL + "donor/:id", null, {
            "update": {
                method: "PUT"
            }
        });

}])
//write
.factory("feedbackFactory", ["$resource", "baseURL", function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id", null, {
            "update": {
                method: "PUT"
            }
        });

}])





//infofactory pagina infoemacion y home
.factory("infoFactory",["$resource", "baseURL", function($resource,baseURL) {
    
          return $resource(baseURL + "info/:id", null, {
            "update": {
                method: "PUT"
            }
        });

}])
.factory("teamFactory",["$resource", "baseURL", function($resource,baseURL) {
    
          return $resource(baseURL + "team/:id", null, {
            "update": {
                method: "PUT"
            }
        });

}])

.factory("favoriteFactory", ["$resource", "baseURL", function ($resource, baseURL) {


    return $resource(baseURL + "favorites/:id", null, {
            "update": {
                method: "PUT"
            },
            "query":  {method:"GET", isArray:false}
        });

}])

.factory("needFactory", ["$resource", "baseURL", function ($resource, baseURL) {

        return $resource(baseURL + "need/:id", null, {
            "update": {
                method: "PUT"
            }
        });

}])

.factory("commentFactory", ["$resource", "baseURL", function ($resource, baseURL) {

        return $resource(baseURL + "need/:id/comments/:commentId", {id:"@Id", commentId: "@CommentId"}, {
            "update": {
                method: "PUT"
            }
        });
    }])
    
    .factory("newdonorFactory", ["$resource", "baseURL", function ($resource, baseURL) {

        return $resource(baseURL + "donor/:id/comments/:commentId", {id:"@Id", commentId: "@CommentId"}, {
            "update": {
                method: "PUT"
            }
        });
        
        

}])


.factory("AuthFactory", ["$resource", "$http", "$localStorage", "$rootScope", "$window", "baseURL", "ngDialog", function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
    var authFac = {};
    var TOKEN_KEY = "Token";
    var isAuthenticated = false;
    var username = "";
    var authToken = undefined;
    

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,"{}");
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common["x-access-token"] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = "";
    isAuthenticated = false;
    $http.defaults.headers.common["x-access-token"] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({username:loginData.username, token: response.token});
              $rootScope.$broadcast("login:Successful");
           },
           function(response){
              isAuthenticated = false;
            
              var message = "\
                <div class=\"ngdialog-message\">\
                <div><h3>Login Unsuccessful</h3></div>" +
                  "<div><p>" +  response.data.err.message + "</p><p>" +
                    response.data.err.name + "</p></div>" +
                "<div class=\"ngdialog-buttons\">\
                    <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=confirm(\"OK\")>OK</button>\
                </div>";
            
                ngDialog.openConfirm({ template: message, plain: "true"});
           }
        
        );

    };
    
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject("userinfo",
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast("registration:Successful");
           },
           function(response){
            
              var message = "\
                <div class=\"ngdialog-message\">\
                <div><h3>Registration Unsuccessful</h3></div>" +
                  "<div><p>" +  response.data.err.message + 
                  "</p><p>" + response.data.err.name + "</p></div>";

                ngDialog.openConfirm({ template: message, plain: "true"});

           }
        
        );
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };

    loadUserCredentials();
    
    return authFac;
    
}]);
