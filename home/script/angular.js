//login page module
var loginApp = angular.module('loginPage', []);
loginApp.controller('loginFormCtrl', function ($scope, $http) {
  $scope.loginUserA = function () {
    if (loginUser()) {
      $http.post('/login_user', $scope.user)
        .then(function (response) {
          console.log(response);
          if (response.data.status == 200) {
            sessionStorage.setItem("current-user", JSON.stringify(response.data.data));
            console.log(JSON.stringify(response.data.data));
            window.open("profile.html", "_self");
          } else {
            window.alert(response.data.message);
          }

        });
    }
  };
})


//register page module
var registerApp = angular.module('registerPage', []);
registerApp.controller('registerFormCtrl', ($scope, $http) => {
  $scope.registerUserA = function () {
    if (registerUser()) {
      $http.post('/register_user', $scope.user)
        .then((response) => {
          console.log("From register" + JSON.stringify(response));
          if (response.data.status == 200) {
            sessionStorage.setItem("current-user", JSON.stringify(response.data.data))
            window.open("profile.html", "_self");
          } else {
            window.alert(response.data.message);
          }
        })
    }
  }
});

var profileApp = angular.module('profilePage', []);
profileApp.controller('profileCtrl', ($scope, $http) => {
  var user = JSON.parse(sessionStorage.getItem("current-user"));
  var email = user['email'];
  console.log(email);

  $http.get('/login_user/?email=' + email)
    .then((response) => {
      var userData = response.data.data
      console.log("From Profile " + userData.email);
      $scope.user = userData
      $scope.user.address = `${userData.addressLine}, ${userData.city}, ${userData.country}`;
      $scope.user.collabCount = userData.collabs.length;
      $scope.user.myCreation = userData.collabs
      console.log($scope.user.myCreation);
      
    })
});

//register page module
var createCollab = angular.module('startCollab', []);
createCollab.controller('collabCtrl', ($scope, $http) => {
  var user = JSON.parse(sessionStorage.getItem("current-user"));
  $scope.createCollab = function () {
    var genre = document.querySelector('input[name="genre"]:checked').value;
    if (saveCollab()) {
      console.log($scope.collab)
      $scope.collab.genre = genre;
      $scope.collab.author = user["_id"];
      $http.post('/save_collab', $scope.collab)
      .then((response) => {
        if(response.data.status == 200){
          window.alert(response.data.message);
          window.open("profile.html", "_self");
        }
      })
    }
  }
});