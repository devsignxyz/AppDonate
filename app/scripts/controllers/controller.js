'use strict';

/**
* @ngdoc function
* @name appDonateApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the appDonateApp
*/
angular.module('appDonateApp')

//create donors
.controller('DonorController', ['$scope',  'donorFactory','$state', '$stateParams','newdonorFactory' ,function  ($scope, donorFactory,$state, $stateParams, newdonorFactory ) {






$scope.newdonor = {
    name: "",
    email: "",
   bloodtype:"",
   location: ""
};

$scope.submitDonor = function () {

    newdonorFactory.save({id: $stateParams.id}, $scope.newdonor);

    $state.go($state.current, {}, {reload: true});


}


}])


//Search 

.controller('findDonorController', ['$scope','donorFactory','newdonorFactory', '$routeParams','$stateParams','$state',  function ($scope, donorFactory ,$routeParams,newdonorFactory,$stateParams,$state ) 
                                 {
    donorFactory.query(
    function (response) {
        $scope.donors = response;
        $scope.showDonor = true;

    },
    function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });




}])





///////////////PERFIL DETAILS//////////

.controller('PerfilDetailsController', ['$scope', '$state', '$stateParams', 'favoriteFactory','donorFactory', 'newdonorFactory',  function ($scope, $state, $stateParams, newdonorFactory, favoriteFactory,donorFactory ) {

$scope.donor = {};
$scope.showDonor = false;
$scope.message = "Loading ...";

$scope.donor = donorFactory.get({
        id: $stateParams.id
    })
    .$promise.then(
        function (response) {
            $scope.donors = response;
            $scope.showDonor = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

$scope.mycomment = {
   name: "",
    email: "",
comment:"",
location:"",
};

$scope.submitComment = function () {

    newdonorFactory.save({id: $stateParams.id}, $scope.mycomment);

    $state.go($state.current, {}, {reload: true});


}



}])

///////////WRITE //////////////


.controller('WriteController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

$scope.feedback = {
    mychannel: "",
    yourname: "",
    email: ""

};


$scope.channels = channels;
$scope.invalidChannelSelection = false;

$scope.sendFeedback = function () {


    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
        $scope.invalidChannelSelection = true;
    } else {
        $scope.invalidChannelSelection = false;
        feedbackFactory.save($scope.feedback);
        $scope.feedback = {
            mychannel: "",
            yourName: "",
            email: ""

        };
        $scope.feedback.mychannel = "";
        $scope.feedbackForm.$setPristine();
    }
};
}])


.controller('infoController', [
'$scope', 'infoFactory',function ($scope,infoFactory)                             {
    infoFactory.query(
    function (response) {
        $scope.infos = response;
        $scope.showInfo = true;

    },
    function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });




}

])



.controller('AboutController', ['$scope', 'teamFactory', function ($scope, teamFactory) {



                              {
    teamFactory.query(
    function (response) {
        $scope.teams = response;
        $scope.showTeam = true;

    },
    function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });




}}])

.controller('HomeController', ['$scope',  'donorFactory', 'infoFactory','needFactory', function ($scope, donorFactory, infoFactory, needFactory ) {



var donors = donorFactory.query({
        featured: "true"
    })
    .$promise.then(
        function (response) {
            var donors = response;
            $scope.donor = donors[0];
            $scope.showDonor = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
$scope.info = infoFactory.query({
        featured: "true"
    })
    .$promise.then(
        function (response) {
            var infos = response;
            $scope.info= infos[0];
            $scope.showInfo = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

$scope.need = needFactory.query({
        featured: "true"
    })
    .$promise.then(
        function (response) {
            var needs= response;
            $scope.need= needs[0];
            $scope.showNeed = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

}])


.controller('ServController', [
'$scope','needFactory', function ($scope,needFactory){

    needFactory.query(
    function (response) {
        $scope.needs = response;
        $scope.showNeed = true;

    },
    function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });





}])

.controller('NeedDetailController', ['$scope', '$state', '$stateParams', 'needFactory', 'commentFactory', function ($scope, $state, $stateParams, needFactory, commentFactory) {

$scope.need = {};
$scope.showNeed = false;
$scope.message = "Loading ...";

$scope.need = needFactory.get({
        id: $stateParams.id
    })
    .$promise.then(
        function (response) {
            $scope.need = response;
            $scope.showNeed = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

$scope.mycomment = {
    name: "",
    email:"",
    comment: ""
};

$scope.submitComment = function () {

    commentFactory.save({id: $stateParams.id}, $scope.mycomment);

    $state.go($state.current, {}, {reload: true});


}
}])





.controller('FavoriteController', ['$scope', '$state', 'favoriteFactory', function ($scope, $state, favoriteFactory) {

$scope.tab = 1;
$scope.filtText = '';
$scope.showDetails = false;
$scope.showDelete = false;
$scope.showMenu = false;
$scope.message = "Loading ...";

favoriteFactory.query(
    function (response) {
        $scope.donors = response.donors;
        $scope.showMenu = true;
    },
    function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });




  $scope.deleteFavorite = function(donorid) {
    console.log('Delete favorites', donorid);
    favoriteFactory.delete({id: donorid});
    $scope.showDelete = !$scope.showDelete;
    $state.go($state.current, {}, {reload: true});
};
}])
    .controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

$scope.loggedIn = false;
$scope.username = '';

if(AuthFactory.isAuthenticated()) {
    $scope.loggedIn = true;
    $scope.username = AuthFactory.getUsername();
}

$scope.openLogin = function () {
    ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
};

$scope.logOut = function() {
   AuthFactory.logout();
    $scope.loggedIn = false;
    $scope.username = '';
};

$rootScope.$on('login:Successful', function () {
    $scope.loggedIn = AuthFactory.isAuthenticated();
    $scope.username = AuthFactory.getUsername();
});

$rootScope.$on('registration:Successful', function () {
    $scope.loggedIn = AuthFactory.isAuthenticated();
    $scope.username = AuthFactory.getUsername();
});

$scope.stateis = function(curstate) {
   return $state.is(curstate);  
};

}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

$scope.loginData = $localStorage.getObject('userinfo','{}');

$scope.doLogin = function() {
    if($scope.rememberMe)
       $localStorage.storeObject('userinfo',$scope.loginData);

    AuthFactory.login($scope.loginData);

    ngDialog.close();

};

$scope.openRegister = function () {
    ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
};

}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

$scope.register={};
$scope.loginData={};

$scope.doRegister = function() {
    console.log('Doing registration', $scope.registration);

    AuthFactory.register($scope.registration);

    ngDialog.close();

};



}])



;
